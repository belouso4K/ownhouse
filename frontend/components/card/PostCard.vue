<template>
  <div class="news-item">
    <div class="img-news">
      <nuxt-link :to="'/posts/'+post.id">
        <img src="assets/img/news-1.jpg" alt="">
      </nuxt-link>

    </div>
    <div class="news-item-area">
      <h3 class="news-item-area_title">
        Что ждет Афганистан после возвращения под
        власть талибов
      </h3>
      <p class="news-item-area_desc">
        После того как «Талибан» захватил почти всю
        территорию Афганистана, президент бежал из
        страны, его дворец захватили талибы. Какие
        ошибки допустили власти Афганистана и чего
        ждать от возвращения «Талибана», разбирался
        РБК

      </p>
      <div class="tegs">
        <a>Спорт</a>
        <a>Мотивация</a>
      </div>
      <div class="news-item-area_elem">
        <p>23 477 <i class="far fa-eye"></i></p>
        <a href=""><i class="fas fa-share"></i></a>
        <a href="" class="like active"><i class="far fa-heart"></i></a>
      </div>
    </div>
  </div>

<!--  <div class="news-item">-->
<!--    <div class="img-news">-->
<!--      <img src="assets/img/news-1.jpg" alt="">-->
<!--    </div>-->
<!--    <div class="news-item-area">-->
<!--      <h3 class="news-item-area_title">-->
<!--        Что ждет Афганистан после возвращения под-->
<!--        власть талибов-->
<!--      </h3>-->
<!--      <p class="news-item-area_desc">-->
<!--        После того как «Талибан» захватил почти всю-->
<!--        территорию Афганистана, президент бежал из-->
<!--        страны, его дворец захватили талибы. Какие-->
<!--        ошибки допустили власти Афганистана и чего-->
<!--        ждать от возвращения «Талибана», разбирался-->
<!--        РБК-->

<!--      </p>-->
<!--      <div class="tegs">-->
<!--        <a>Спорт</a>-->
<!--        <a>Мотивация</a>-->
<!--      </div>-->
<!--      <div class="news-item-area_elem">-->
<!--        <p>23 477 <i class="far fa-eye"></i></p>-->
<!--        <a href=""><i class="fas fa-share"></i></a>-->
<!--        <a href="" class="like active"><i class="far fa-heart"></i></a>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>

    export default {
        props: {
            post: null
        }
    }
</script>

