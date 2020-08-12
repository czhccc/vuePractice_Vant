<template>
    <div class="check-button">
      <div class="icon" :class="{'active': isChecked}">
        <img src="~/assets/img/cart/tick.svg" alt="">
      </div>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
		  isChecked: {
		    type: Boolean,
        default: true
      }
    },
	}
</script>

<style scoped>
  .icon {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
