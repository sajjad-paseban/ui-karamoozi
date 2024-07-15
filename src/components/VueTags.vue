<template>
    <div>
      <div class="tag-wrapper">
        <div class="d-flex justify-content-end">
            <label for="vue-tags" class="my-1">
                {{ label }}
            </label>
        </div>
        <input
          id="vue-tags"
          data-lang="fa"
          v-model="tag"
          @input="getFilter"
          @keyup.enter.prevent="appendTag(tag)"
        />
        <ul v-show="isOpen" class="tag-ul-autocomplete">
          <li
            v-for="tag in results"
            :key="tag"
            class="tag-li-autocomplete"
            @click="appendTag(tag)"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
      <div class="tag-list-wrapper">
        <span v-for="tag in tags" :key="tag" class="tag-list">
          {{ tag }}
          <span class="tag-remove" @click="removeTag(tag)">
            &times;
          </span>
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VueTag',
    props: {
      label:{
        type: String,
        default: 'کلمات کلیدی'
      },
      tags: {
        type: Array,
        default: () => []
      },
      suggestions: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        tag: '',
        isOpen: false,
        results: [],
      }
    },
    methods: {
      getFilter() {
        if (this.tag !== '') {
          this.results = this.suggestions.filter(tag => tag.toLowerCase().indexOf(this.tag.toLowerCase()) === 0)
          this.isOpen = true;
        } else {
          this.results = [];
          this.isOpen = false;
        }
      },
      appendTag(item) {
        this.tag = '';
        this.isOpen = false;
        if (item.trim() === '') return;
  
        let duplicate = false;
        this.tags.forEach((tag) => {
          if (tag === item.trim()) {
            duplicate = true;
          }
        });
  
        if (duplicate) return;
  
        this.tags.push(item.trim());
        this.$emit('tags-changed', this.tags);
      },
      removeTag(tag) {
        const index = this.tags.indexOf(tag);
        this.tags.splice(index, 1);
        this.$emit('tags-changed', this.tags);
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .tag-wrapper {
    width: 100%;
    position: relative;
    display: inline-block;
  }
  
  .tag-ul-autocomplete {
    margin: 0;
    padding: 0;
    width: 200px;
    box-shadow: .05em .01em .5em rgba(0,0,0,.2);
    background: white;
    list-style-type: none;
  }
  
  .tag-li-autocomplete {
    padding: 5px 10px;
    margin: 0;
    text-align: left;
  
    list-style: none;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
  
    &:hover {
      background-color: #D3D3D3;
    }
  }
  
  .tag-list-wrapper {
    font-family: Roboto, sans-serif;
    font-size: 11.8px;
    letter-spacing: 1.25px;
    display: flex;
    flex-wrap: wrap;
    direction: rtl;
    padding: 10px 0;
    width: 100%;
  }
  
  .tag-list {
    display: inline-block;
    padding: 5px 5px 5px 2px;
    margin: 5px 5px 5px 0;
    font-family: 'yekan';
    background: #d8d8d8;
    font-size: 14px;
    border-radius: 20px;
    cursor: pointer;
  }
  
  .tag-remove {
    display: inline-block;
    width: 15px;
    margin-left: 3px;
    background-color: #9b9a9b;
    border-radius: 99px;
    line-height: 15px;
    font-size: 15px;
    text-align: center;
    color: #d8d8d8;
    cursor: pointer;
  }
  input{
      border: 1px solid rgba($color: #000000, $alpha: 0.2);
      border-radius: 3px;
      padding: 10px;
      color: #3B566E;
      width: calc(100% - 20px);
  }
  label{
      color: #3B566E;
  }
  input:focus{
      outline: 1px solid #384DFF;
      background-color: rgb(232, 240, 254);
  }
  input[data-lang="en"]{
      font-family: calibri;
      font-size: 15px;
  }
  input[data-lang="fa"]{
      font-family: 'vazir';
      direction: rtl;
      font-size: 15px;
  }
  </style>
  
  