<template>
  <div>
    <Header/>
    <div class="index flex xl:px-32 lg:px-8 md:px-4 flex-col lg:flex-row bg-gray-200">
      <div class="w-auto lg:w-3/4 mx-4">
        <div class="bg-white my-4 p-4 shadow">
          <p class=" text-2xl">プライバシーポリシー</p>
          <hr />
          <div>
            <p class="text-2xl">アクセス解析ツールについて</p>
            <p>当ブログでは、Google社の「Google Analytics」を用いてアクセス解析をしています。データ収集のためにCookieを使用しますが、このデータは匿名で収集されており、個人を特定するものではありません。収集された情報は、Google社によって同社のプライバシーポリシーに基づいて管理されます。データの保護に関する情報は、<a href="https://support.google.com/analytics/answer/6004245?hl=ja">こちら</a>をご確認ください。Googleアナリティクスの規約に関しては、<a href="https://marketingplatform.google.com/about/analytics/terms/jp/">こちら</a>をご確認ください。</p>
            <p>Google社が提供する<a href="https://tools.google.com/dlpage/gaoptout?hl=ja">Google アナリティクス オプトアウト アドオン</a>をダウンロードおよびインストールすることで、本ブログや他のサイトでのGoogle Analyticsによる情報の収集を停止することができます。詳しくは、<a href="https://support.google.com/analytics/answer/181881?hl=ja">こちら</a>をご確認ください。</p>
          </div>
          <!-- <div class="mt-4">
            <p class="text-2xl">当ブログに掲載されている広告について</p>
            <p>当ブログでは、Google社の「Google Adsense」を用いて広告を表示しています。ユーザーの興味に応じた商品やサービスの広告を表示するためにCookieを使用することがあります。第三者がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにCookieを設定したりこれを認識したりする場合があります。Cookieを使用することで、個人が特定されることはありません。</p>
            <p>Cookieによる情報収集は、Cookieを無効にすることで拒否をすることができます。Cookieを無効にする方法など、詳しくは<a href="https://policies.google.com/technologies/ads?gl=jp" >こちら</a>をご確認ください。</p>
          </div>
          <div class="mt-4">
            <p class="text-2xl">免責事項</p>
            <p>当ブログからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。</p>
            <p>当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることがございます。</p>
            <p>当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。</p>
          </div> -->
        </div>
        <div class="my-4">
          <nuxt-link to="/">トップページに戻る</nuxt-link>
        </div>
      </div>
      <Sidebar class="w-auto lg:w-1/4 m-4" />
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'プライバシーポリシー',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex'},
        { hid: "description", name: "description", content: "プライバシーポリシー" },
        { hid: "og:site_name", property: "og:site_name", content: "NineBolt" },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://ninebolt.net/privacy/"
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "プライバシーポリシー - NineBolt"
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "プライバシーポリシー"
        }
      ]
    }
  },
}
</script>

<style scoped>
p > a {
  @apply text-blue-800;
  text-decoration: underline;
}

p > a:hover {
  @apply text-blue-500;
}
</style>