<template>
<div class="contact">
<slot></slot>
</div>
</template>
<style>
.contact {
    position: absolute;
    border-radius: 50px;
    background: rgba(63, 99, 167, 0.20);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    width: 50%;
    height: 93px;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;

}</style>