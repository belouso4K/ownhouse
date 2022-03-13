<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Dashboard</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Dashboard v1</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div>
    </section>
    <section class="content">
      <div class="container-fluid">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-8">
              <div class="card card-primary">
<!--                <div class="card-header">-->
<!--                  <h3 class="card-title">Quick Example</h3>-->
<!--                </div>-->
                <!-- /.card-header -->
                <!-- form start -->

                  <div class="card-body">
                    <div class="form-group">
                      <label for="header-text">Заголовок</label>
                      <input v-model="form.title" type="text" class="form-control" id="header-text" placeholder="Введите заголовок">
                      <p class="error-text" v-if="!validations.title.valid">{{validations.title.message}}</p>
                    </div>
                    <div class="form-group">
                      <label>Описание</label>
                      <client-only>
                        <quill-editor
                          v-model="form.desc"
                          style="min-height:300px;"
                          ref="editor"
                          :options="editorOption"
                        />
                      </client-only>
                    </div>
                    <div class="form-group">
                      <label for="except-textarea">Небольшое описание</label>
                      <textarea v-model="form.excerpt" type="text" class="form-control" id="except-textarea" placeholder="Введите небольшое описание"></textarea>
                    </div>
                  </div>
                  <!-- /.card-body -->
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-primary">
<!--                <div class="card-header">-->
<!--                  <h3 class="card-title">Quick Example</h3>-->
<!--                </div>-->
                <!-- /.card-header -->
                <!-- form start -->


                  <div class="card-body">
                    <div class="form-group">
                      <!-- <label for="customFile">Custom File</label> -->
                      <label>Доступ</label>
                      <div class="custom-control custom-radio">
                        <input type="radio" class="form-check-input " id="privateCheck1" v-model="form.radio" value="0">
                        <label class="form-check-label" for="privateCheck1">Приватный</label>
                      </div>
                      <div class="custom-control custom-radio">
                        <input type="radio" class="form-check-input" id="publicCheck1" v-model="form.radio" value="1">
                        <label class="form-check-label" for="publicCheck1">Публичный</label>
                      </div>
                    </div>
                    <div class="form-group">
                      <!-- <label for="customFile">Custom File</label> -->
                      <label>Изображение для превью</label>
                      <div class="custom-file">
                        <input @change="onFileChange" type="file" placeholder="Довавьте изображение" class="custom-file-input" id="customFile">
                        <label class="custom-file-label" for="customFile">Довавьте изображение...</label>

                      </div>
                    </div>
                    <div class="form-group img">
                      <img :src="imgShow ? imgShow : false" alt="">
                    </div>
                    <div class="form-group tags-controller">
                      <label for="add-tag" class="label-tags">Добавить тег <p>{{ maxTags - form.tags.length }}</p></label><p></p>

                      <div class="input-group input-group-mb">
                        <input @keyup="addTag"
                               @focus="activeSelect = true"
                               type="text" class="form-control"
                               id="add-tag" placeholder="Введите тег">
                        <span class="input-group-append">
                          <button type="button" class="btn btn-primary">Добавить</button>
                        </span>
                        <ul v-if="activeSelect" class="select-tags" >
                          <li>
                            <p>Игры</p>
                            <span>×</span>
                          </li>
                          <li>
                            <p>Технологии</p>
                            <span>×</span>
                          </li>
                          <li>
                            <p>Музыка</p>
                            <span>×</span>
                          </li>
                          <li>
                            <p>Игры</p>
                            <span>×</span>
                          </li>
                          <li>
                            <p>Музыка</p>
                            <span>×</span>
                          </li>
                          <li>
                            <p>Мотивация</p>
                            <span>×</span>
                          </li>
                        </ul>
                      </div>

                      <ul class="tags">
                        <li v-for="tag in form.tags">{{ tag }}<i  class="fas fa-times" @click="removeTag(this, tag)"></i></li>
<!--                        <a>Спорт</a>-->
<!--                        <a>Мотивация</a>-->
<!--                        <a>Игры</a>-->
<!--                        <a>Технологии</a>-->
<!--                        <a>Музыка</a>-->
                      </ul>


                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1">
                      <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                  </div>
                  <!-- /.card-body -->

                  <div class="card-footer">
                    <button @click="sendBtn" type="submit" class="btn btn-primary float-right">Сохранить</button>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

  </div>

</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'addPost',
  layout: 'Admin',
  data() {
    return {
      form:{
        title: '',
        desc: '',
        excerpt: '',
        radio: '1',
        img: '',
        tags: [],
      },
      activeSelect: false,
      imgShow: false,
      validations: {
        title: {
          valid: true,
          message: ''
        },
        desc: {
          valid: true,
          message: ''
        },
        img: {
          valid: true,
          message: ''
        },
      },
      maxTags: 10,
      editorOption: {
        placeholder: 'Введите описание...',
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['clean'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video']
          ],
        }
      },
    }
  },
  watch:{
    'form.title':  {
      handler: function (after, before) {
        this.validations.title.valid = true
      },
      deep: true
    },
    'form.desc':  {
      handler: function (after, before) {
        this.validations.desc.valid = true
      },
      deep: true
    },
    posts() {
    },
    slug() {
      this.$router.push({path: `/admin/post/${this.slug}`})
    },
  },
  computed: {
    ...mapGetters({
      posts: "admin/posts/getAllPosts",
      slug: "admin/posts/getSlug",
    })

  },
  methods: {
    sendBtn() {
      if (this.validation()) {

        this.$store.dispatch('admin/posts/createPost', this.form)
      }
    },
    validation() {
      let validNewCafeForm = true;

      if( this.form.title == '' ){
        validNewCafeForm = false;
        this.validations.title.valid = false;
        this.validations.title.message = 'Введите заголовок.'
      }else{
        if( this.form.title.length < 3 ){
          validNewCafeForm = false;
          this.validations.title.valid = false;
          this.validations.title.message = 'Заголовок не может быть меньше 5 символов.'
        }else{
          this.validations.title.valid = true;
          this.validations.title.message = '';
        }
      }

      if( this.form.desc == '' ){
        validNewCafeForm = false;
        this.validations.desc.valid = false;
        this.validations.desc.message = 'Введите описание.'
      }else{
        if( this.form.desc.length < 3 ){
          validNewCafeForm = false;
          this.validations.desc.valid = false;
          this.validations.desc.message = 'Описание не может быть меньше 3 символов.'

        }else{
          this.validations.desc.valid = true;
          this.validations.desc.message = '';
        }
      }

      if( this.form.img == ''){
        validNewCafeForm = false;
        this.validations.img.valid = false;
        this.validations.img.message = 'Добавьте изображение.'
      }else{
        this.validations.img.valid = true;
        this.validations.img.message = '';
      }

      return validNewCafeForm;
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;

      let reader = new FileReader();
      let vm = this;
      reader.onload = (e) => {
        vm.imgShow = e.target.result;
      };
      reader.readAsDataURL(files[0]);
      this.form.img = files[0]

    },
    removeTag(element, tag){
      let index  = this.form.tags.indexOf(tag);
      this.form.tags = [...this.form.tags.slice(0, index), ...this.form.tags.slice(index + 1)];
    },
    addTag(e){
      if(e.key == "Enter"){
        let tag = e.target.value.replace(/\s+/g, ' ');
        if(tag.length > 1 && !this.form.tags.includes(tag)){
          if(this.form.tags.length < 10){
            tag.split(',').forEach(tag => {
              this.form.tags.push(tag);
            });
          }
        }
        e.target.value = "";
      }
    },
    clearForm(){

      this.form.title          = '';
      this.form.desc          = '';
      this.form.excerpt       = '';
      this.form.radio         = '1';
      this.form.img           = '';
      this.form.tags          = [];
      this.imgShow            = false;

      this.validations = {
        title: {
          valid: true,
          text: ''
        },
        desc: {
          valid: true,
          text: ''
        },
        img: {
          valid: true,
          text: ''
        },
      };

    },
    addTagSelect() {
      let tagUl = document.querySelectorAll('ul.select-tags li p')
      let input = document.querySelector('#add-tag')
      if (tagUl) {
        tagUl.forEach((li) => {
          li.addEventListener('click', (tag) => {
            input.value += tag.target.innerHTML
          })
        })
      }

    },
    focusInputShowSelect() {
      let input = document.querySelector('#add-tag')

      input.addEventListener('focusout', (el) => {
        el.preventDefault()
        document.onclick = (item) => {
          if (item.target.closest('.select-tags') || el.target == item.target) {
            input.focus()
            this.addTagSelect()
          } else {
            this.activeSelect = false

          }
        }
      })

    }


  },

  mounted() {
  this.focusInputShowSelect()

  },
  destroyed() {
    this.$store.commit('admin/posts/setPostsLoad', true)

  }
}
</script>

<style>

.content ul input{
  flex: 1;
  padding: 5px;
  border: none;
  outline: none;
  font-size: 16px;
}

.error-text {
  color: red;
  margin-top: 4px;
}

ul.select-tags {
  border: 1px solid #cecece;
  margin-top: 5px;
  border-radius: 5px;
  padding: 11px 20px 20px 13px;
  position: absolute;
  width: 100%;
  bottom: -192px;
  right: 0;
  left: 0;
  height: 187px;
  overflow: hidden;
  overflow-y: auto;
  z-index: 99999;
  background: #fff;
}

.select-tags li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select-tags li span {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  transition: all .3s ease;
  display: block;
  cursor: pointer;
}

.select-tags li span:hover {
  background: #ff3c3c;;
  color: #fff;
  transition: all .3s ease;
}

.select-tags li:not(:last-child) {
  margin-bottom: 5px;
}

.select-tags li p {
  cursor: pointer;
}

.create-new-tag {
  margin-top: 10px;
}

</style>
