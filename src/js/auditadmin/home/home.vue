<template>
    <div class="box">
        <div class="Absolute-Center" >
            登录成功
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {

            }
        },
        methods: {
        }
    }
</script>
<style>
  @import "../../../less/layout.css";
        html,body{
         margin: 0; padding: 0;
        }
        .box {
            position: relative;
            width: 600px;               /*宽*/
            height: 400px;              /*高*/
            margin: 0 auto;
        }
        .Absolute-Center {
            font-size: 16px;
            width: 160px; height: 80px;
            position: relative;
            top: 50%;
            -moz-transform: translateY(-50%);  /*向上平移 自身的50%*/
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            -o-transform: translateY(-50%);
            transform: translateY(-50%);
            margin: auto;
        }

</style>
