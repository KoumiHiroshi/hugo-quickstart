---
# Common-Defined params
title: "Win11/10でRsyncを使った差分バックアップ"
date: 2022-11-12T19:36:11+09:00
description: ""
categories:
  - "memo"
tags:
  - "WSL"
  - "rsync"
  - "バックアップ"
# menu: main # Optional, add page to a menu. Options: main, side, footer

# Theme-Defined params
thumbnail: "img/placeholder.png" # Thumbnail image
lead: "RAIDはバックアップとしては使えないという話を聞いたので、バックアップのとりかたを調べてみる。" # Lead text
comments: true # Enable Disqus comments for specific page
authorbox: true # Enable authorbox for specific page
pager: true # Enable pager navigation (prev/next) for specific page
toc: false # Enable Table of Contents for specific page
mathjax: false # Enable MathJax for specific page
sidebar: "right" # Enable sidebar (on the right side) per page
# widgets: # Enable sidebar widgets in given order per page
---

## WSLからrsyncを動かす

Windows11環境でバックアップをとりたい。
管理や復元が簡単な良い方法がないか調べてみた。

[hackers-high.com - rsyncだけで実現する！ファイルのバックアップ手法6選 【コマンド例編】](https://hackers-high.com/linux/rsync-backup-part2/)
を読むとrsyncを使えば比較的簡単にバックアップがとれるようだ。
Win11/10ならWSLからrsyncを使えばよさそうなので、試してみる。

WSLの導入は省略。以降はWSL内でrsyncが使える環境が前提。

WSLは直接コマンドを受け取って実行してくれるので、
コマンドプロンプトかPowershellから次のように実行すれば
SRCDIRにあるオリジナルをDESTDIRにバックアップしてくれる。

```console
> wsl rsync -a --delete SRCDIR DESTDIR
```

あるいはLinuxディストリビューションのシェルから実行することもできる

```console
$ rsync -a --delete SRCDIR DESTDIR
```

これだけでも単純なバックアップになるが、最後にバックアップした内容しか残らない。
過去のバックアップが必要になったときのために、
最新のバックアップは直前のバックアップから変更があったその差分だけ記録するようにしたい。

## 最初のバックアップ

`C:\Users\username\source\repos`というディレクトリを`E:\backup\`にバックアップしたい。

最初に基準として使うバックアップを作成する。
これは後のバックアップから参照するためのものなので、単なるコピーと同じ。
また、WSL内では各ドライブが`/mnt/`にマウントされている。

```console
> wsl rsync -a /mnt/c/Users/username/source/repos /mnt/e/backup/repos-20221111
```

名前順で並べたいので`repos-20221111`というディレクトリにコピーした。

## バックアップ用スクリプト

最終的に自動化したいので、バックアップ処理を行うスクリプトを書く。

```sh
#!/bin/sh

# rsyncを使ったバックアップ

ORIGINAL="$1" # オリジナルのディレクトリパス(末尾に/をつける)
BASENAME=`basename $ORIGINAL` # バックアップ名
EXCLUDE=".git/" # バックアップ対象から除外するパス
NEWBACKUP="./$BASENAME-$(date +%Y%m%d-%H%M%S)" # 新しいバックアップのパス
LASTBACKUP=`find . -maxdepth 1 -path "./$BASENAME-[0-9]*" | tail -n 1`

if [ -z $LASTBACKUP ] ; then
	# 初回バックアップはコピー
	rsync -a --exclude="$EXCLUDE" "$ORIGINAL" "$NEWBACKUP"
else
	# 二回目以降のバックアップはハードリンク
	rsync -a --exclude="$EXCLUDE" --delete --link-dest="../$LASTBACKUP" "$ORIGINAL" "$NEWBACKUP"
fi
```

今回、バックアップしたいディレクトリにgitリポジトリが含まれるので、
`--exclude`でバックアップ対象から除外している。

これをバックアップ先に`backup.sh`という名前で保存した。

```console
/mnt/e/backup$ tree . -L 1
.
|-- backup.sh
`-- repos-20221111

1 directory, 1 file
```

手動で新しいバックアップをとるときは`backup.sh`にオリジナルのファイルパスを渡す。
このとき末尾に/をつけるのを忘れずに。（rsyncに渡したときにパスの意味が変わってくるため）

```console
/mnt/e/backup$ ./backup.sh /mnt/c/Users/koumi/source/repos/
/mnt/e/backup$ tree . -L 1
.
|-- backup.sh
|-- repos-20221111
`-- repos-20221112-212756

2 directories, 1 file
```

ちゃんと差分バックアップになっているか確認する。
duでファイルをカウントすると、それ以降同じファイルを指すハードリンクが見つかってもカウントしないので、
変更した分だけカウントされていれば差分がとれている。この場合は12K分だけ変更があった。

```console
/mnt/e/backup$ du -chs repos-2022111*
899M    repos-20221111
12K     repos-20221112-212756
899M    total
```

`--link-dest`オプションを指定すると、rsyncは変更のなかったファイルに対してはハードリンクを作成するので、
最初のバックアップに含まれるファイルと次のバックアップに含まれるファイルは、
変更が無ければ同じファイルを指している。

この方法なら過去の状態も保持しつつ、短いスパンでバックアップをとってもディスク消費が抑えられるし、
復元するときも必要な日付のディレクトリをコピーするだけで済む。

## バックアップの自動化

Windows環境なのでタスクスケジューラを使う。
スタートメニューから検索して起動する。

[![タスクスケジューラ](/img/memo/task-scheduler.png)](/img/memo/task-scheduler.png)

右側の「タスクの作成」でタスクを作成する。
名前欄にこのタスクの名前を好きに書いておく。

[![タスクスケジューラの実行内容](/img/memo/task-scheduler-operation.png)](/img/memo/task-scheduler-operation.png)

「操作」タブ→「新規」で実行する内容を指定する。
プログラム欄は`wsl`、引数に`--cd /mnt/e/backup/ ./backup.sh /mnt/c/User/username/source/repos/`を
指定する。（`--cd`で作業ディレクトリを指定している）

あとは「トリガー」タブで起動するスケジュールを決めれば好きなタイミングでバックアップを取ってくれる。