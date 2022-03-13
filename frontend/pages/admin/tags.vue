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
        <div class="row">
          <div class="col-md-5">
            <div class="card card-primary">
              <form action="">
                <div class="card-header">
                  Добавление тега
                </div>
                <div class="card-body">

                    <div class="form-group">
                      <label for="tag-name">Название тега*</label>
                      <input  type="text" class="form-control" id="tag-name" placeholder="Введите тег">
                      <p class="error-text"></p>
                    </div>
                    <div class="form-group">
                      <label for="tag-slug">url</label>
                      <input  type="text" class="form-control" id="tag-slug" placeholder="Введите тег">
                      <p class="error-text"></p>
                    </div>

                </div>
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary float-right">Сохранить</button>
                </div>
              </form>
            </div>
          </div>
          <div class="col-md-7">
            <div class="card ">
              <div class="card-header">
                Все теги
              </div>
              <div class="card-body table-responsive p-0" >
                <table class="table table-head-fixed text-nowrap">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Тег</th>
                    <th>url</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>183</td>
                    <td @dblclick="disabledTarget($event)"><input @keyup="editTag" @blur="editTag" type="text" value="John Doe" disabled></td>
                    <td @dblclick="disabledTarget($event)"><input @keyup="editTag" @blur="editTag" type="text" value="John-Doe" disabled></td>
                  </tr>
                  <tr>
                    <td>219</td>
                    <td>Alexander Pierce</td>
                    <td>Alexander-Pierce</td>
                  </tr>
                  <tr>
                    <td>657</td>
                    <td>BobDoe</td>
                    <td>Bob-Doe</td>
                  </tr>
                  <tr>
                    <td>175</td>
                    <td>Mike Doe</td>
                    <td>Mike-Doe</td>
                  </tr>
                  <tr>
                    <td>134</td>
                    <td>Jim Doe</td>
                    <td>Jim-Doe</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'addPost',
  layout: 'Admin',
  data() {
    return {
    }
  },
  methods: {
    disabledTarget(e) {
      e.target.disabled=0
      e.target.focus()
    },
    editTag(e) {
      if(e.key == "Enter"){
        e.target.disabled = 'disabled'
      }  else if(e.key && e.key !== "Enter") {
        e.target.disabled=0
      } else {
        e.target.disabled='disabled'
      }
    },
    // focusout() {
    //   e.target.disabled='disabled'
    // }
  }
}
</script>

<style>


</style>
