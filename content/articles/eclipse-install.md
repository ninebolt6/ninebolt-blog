---
title: 'Spigot(Bukkit)プラグインの開発環境を作る'
description: 'この記事では、MinecraftのSpigot(Bukkit)サーバーで動作するプラグインの開発に必要なソフト「Eclipse」の導入方法を紹介します。'
category: 'プラグイン開発'
tags: ['Minecraft']
isUpdated: 'false'
---

## 開発に使用するソフト

Minecraft Java EditionはJavaというプログラミング言語で書かれています。マルチプレイ用サーバーにも同じくJavaが使われています。<br>
Javaの開発には、よくIntellijやEclipseなどのソフトが使われますが、今回はEclipseを用いて、プラグインの開発環境を作っていきます。

## Eclipseのダウンロード

[MergeDoc Project](https://mergedoc.osdn.jp/)から最新版をダウンロードします。<br>
記事執筆時点での最新バージョンは、2020-06です。Javaの`Full Edition`(画像の赤枠の部分)をクリックし、ダウンロードしてください。
<lazy-image src="/eclipse_download.png" :width="748" :height="184" />

## ダウンロードしたファイルの解凍

解凍には、Windowsの場合[7-Zip](https://sevenzip.osdn.jp/)を使いましょう。Eclipseには、非常に名前の長いフォルダが含まれているため、エクスプローラーでは開けなかったり、解凍時にエラーになる可能性があります。また、解凍場所はなるべくドライブ直下にしましょう。<br>
> (例) D:\pleiades\ ...

## Eclipseの起動

eclipse.exeをダブルクリックして起動すると、次のようなダイアログが出てきます。`ワークスペース`は、作成するプラグインのソースコードが保存される場所です。
`この選択をデフォルトとして使用し～`にチェックを入れると、次回起動時からこのダイアログは表示されなくなります。設定を確認し、`起動`をクリックします。
<lazy-image src="/eclipse_init.png" :width="638" :height="279" />

以下の画面が表示されれば、Eclipseの導入は完了です。
<lazy-image src="/eclipse_start.png" :width="1010" :height="761" />

### トラブルシューティング
- ダブルクリックしても何も表示されない, `No Java virtual machine was found`と表示される

Full EditionにはEclipse実行用のJavaが付属していますが、環境変数が悪さをしてJavaをうまく読み込めず起動できない場合があります。設定ファイルからJavaのパスを手動で指定してあげましょう。eclipse.iniに-vmオプションがあれば書き換えを、なければ以下の文字列を先頭に追加してください。

```ini[pleiades/eclipse/eclipse.ini]
-vm
../java/11/bin/server
```

> Eclipseが使用するデフォルトのバージョンは`Java 11`です。
> Full Editionには他にもJava 8やJava 14が同梱されているので、11の部分を変更することで、バージョンを任意に変更することができます。
> Java 8を使用する場合は、パス末尾の`server`を削除してください。

## さいごに

この記事ではEclipseの導入方法を紹介しました。次の記事では、プラグインのひな型と、簡単なログを出力するプラグインの作り方を紹介します。