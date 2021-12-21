<template>
  <div>
    <b-card
      title="Card Title"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text v-if="user">
        {{user[0].name}}
      </b-card-text>

      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div>
</template>

<script>

export default {
  name: "Profile",
  data() {
    return {
      user: {}
    }
  },
  mounted() {
   this.$store.dispatch('GET_USER')
      .then((res) => {
          if(res) {
            this.user = this.$store.getters.getUserData
        }
      })
    .catch(error => console.log(error))
  }
}
</script>

<style scoped>

</style>
