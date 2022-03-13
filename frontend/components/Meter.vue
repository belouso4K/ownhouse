<template>
    <div class="LoadProgressBar">
      <span class="bg-red"></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
</template>

<script>
    export default {
        props: {
            value: null
        },
        watch: {
            value () {
                let span = document.querySelectorAll('.LoadProgressBar span')
                span.forEach((item, i) => {
                    switch (this.value) {
                        case 0:
                            item.className = ""
                            if (i === 0) item.classList.add('bg-red')
                            break;
                        case 2:
                            item.className = ""
                            if (i < 2) item.classList.add('bg-orange')
                            break;
                        case 3:
                            item.className = ""
                            if (i < 3) item.classList.add('bg-yellow')
                            break;
                        case 4:
                            item.className = ""
                            if (i < 4) item.classList.add('bg-green')
                            break;
                    }
                })
            }
        }

    }
</script>

<style scoped>

</style>
