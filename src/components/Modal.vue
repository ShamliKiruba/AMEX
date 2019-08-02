<template>
  <transition name="fade" class="error-model">
    <div class="overlay">
      <div class="modal">
        <transition name="slide-fade">
          <div class="modal-body">
            <div class="modal-box">
              <img src="https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png" alt>
              <div class="msg-title">Sorry something went wrong!</div>
              <div class="msg-body">Please try again later.</div>
            </div>

            <div class="btn-wrapper">
              <button class="modal-btn full dismiss" @click="retry()">Retry</button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  methods: {
    retry() {
      // this.$parent.$emit('ERROR_MODAL', 'close');
      window.location.reload();
    }
  },  
}
</script>
<style lang="scss">
.overlay {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: table;
    transition: opacity .3s ease;
    .modal {
        display: table-cell;
        vertical-align: middle;
        .modal-body {
          width: 85%;
          margin: 10% auto;
          background-color: #fff;
          border-radius: 2px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
          transition: all .3s ease;
          font-family: Helvetica, Arial, sans-serif;
          overflow-y: auto;
          max-height: 70%;
        }
    }
}
.modal-box {
  padding: 24px 16px;
  line-height: 1.25;
  text-align: center;
  color: #353535;
  img {
    width: 60px;
    height: 60px;
  }
  .msg-title {
    font-size: 16px;
  }
  .msg-body {
    font-size: 14px;
    color: #222222;
    margin-top: 8px;
    letter-spacing: 0.6px;
    line-height: 1.29;
  }
}
.btn-wrapper {
  width: 100%;
  border-top: 1px solid #e5e5e5;
  .modal-btn {
    border-radius: 0px;
    padding: 16px;
    margin: 0px;
    display: inline-block;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 0;
    font-size: 14px;
    outline: 0;
    appearance: none;
    background-color: #fff;
  }
}    
</style>