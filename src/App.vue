<template>
  <div id="app">
    <div
      class="date-section"
      style="width: 250px; border: 2px solid rgb(230, 228, 228); border-radius: 8px; padding: 2px 0 2px 2px"
    >
      <v-date-picker
        class="inline-block h-full"
        v-model="actualDates"
        mode="range"
        :model-config="modelConfig"
      >
        <template v-slot="{ inputValue, togglePopover }">
          <div style="
                              display: flex;
                              width: 200px;
                               height: 35px; 
                            ">
            <button
              style="background: white; border: none"
              @click="
                                togglePopover({ placement: 'bottom' })
                              "
            >
              <img
                src="./assets/icons/icon_calender.svg"
                style="height: 20px;"
              />
            </button>
            <input
              :value="inputValue"
              placeholder="Select a date-range"
              style="
                                font-weight: 500;
                                color: #4d4d4d;
                                padding-left: 5px;
                                height: 95%;
                                border: none;
                              "
              readonly
            />
          </div>
        </template>
      </v-date-picker>
      <div style="position: relative;
          margin-top: -37px;
          float: right;
          width: 40px;
          text-align: center;
          background: rgb(243, 242, 242);
          height: 39px;
          border-radius: 0 8px 8px 0;
      ">
        <img
          src="./assets/icons/icon_search.svg"
          alt=""
          style="height: 20px; margin-top: 10px;"
        >
      </div>
    </div>
    <div class="results_title">
      Results: {{count}} mails(s)
    </div>
    <div class="list-container">
      <div
        v-if="isDataPresent"
        class="list"
      >
        <div
          class="list__mobile"
          v-if="isMobile"
        >
          <div class="header">
            <div>From</div>
            <div>To</div>
            <div>Subject</div>
            <div>Date</div>
          </div>
          <div class="table-items"></div>
        </div>
        <div
          class="list__web"
          v-else
        >
          <div class="header">
            <div class="header__from">From</div>
            <div class="header__to">To</div>
            <div class="header__notifier">&nbsp;</div>
            <div class="header__subject">Subject</div>
            <div class="header__date">Date</div>
          </div>
          <div class="table-items">
            <div
              class="list-item"
              v-for="(item, index) in json"
              :key="index"
            >
              <div class="list-item__from">{{item.from}}</div>
              <div class="list-item__to">{{getToIds(item.to)}}</div>
              <div class="list-item__notifier">
                <div style="width: 20px; padding: 4px 4px; border-radius: 3px; font-size: 14px; background: gray; color: white;">+1</div>
              </div>
              <div class="list-item__subject">{{item.subject}}</div>
              <div class="list-item__date">{{item.date}}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="is-empty"
      >
        <img
          src="./assets/icons/logo.png"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
import jsonData from './static/data/mails.json';
export default {
  data () {
    return {
      actualDates: {
        start: null,
        end: null,
      },
      modelConfig: {
        type: "number",
      },
      count: 0,
      isMobile: false,
      isDataPresent: true,
      json: jsonData.data
    }
  },
  computed: {
    getToIds () {
      return data => {
        if (data.length === 1) return data[0];
        else {
          let str = '';
          for (let i = 0; i < data.length; i += 1) {
            if (i !== data.length - 1) str += `${data[i]}, `;
            else str += `${data[i]}`;
          }
          return str;
        }
      }
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    onResize () {
      this.isMobile = window.innerWidth < 600
    }
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 25px 40px;
  height: calc(100vh - 70px);
  color: #2c3e50;
  input {
    &:focus {
      outline: none;
    }
  }
  .results_title {
    margin-top: 25px;
    font-weight: 600;
    color: #5a5858;
    height: 30px;
    // border-bottom: 1px solid lightgrey;
  }
  .list-container {
    height: calc(100% - 100px);
    .is-empty {
      width: 150px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: relative;
    }
    .list {
      height: 100%;
      &__web {
        height: 100%;
        .header {
          display: flex;
          margin-top: 20px;
          border: 2px solid rgb(230, 228, 228);
          border-left: none;
          border-right: none;
          font-weight: 600;
          background: rgb(243, 242, 242);
          padding: 15px;
          &__from {
            width: 20%;
            margin-left: 10px;
          }
          &__to {
            width: 35%;
            margin-left: 10px;
          }
          &__notifier {
            width: 5%;
            margin-left: 10px;
          }
          &__subject {
            width: 30%;
            margin-left: 10px;
          }
          &__date {
            width: 10%;
            margin-left: 10px;
            font-weight: bold;
          }
        }
        .table-items {
          max-height: calc(100% - 40px);
          overflow-y: auto;
          .list-item {
            display: flex;
            border: 1px solid rgb(230, 228, 228);
            border-left: none;
            border-right: none;
            padding: 15px;
            &:hover {
              color: blue;
              cursor: pointer;
            }
            &__from {
              width: 20%;
              margin-left: 10px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            &__to {
              width: 35%;
              margin-left: 10px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &:hover {
                text-overflow: clip;
                white-space: normal;
                word-break: break-all;
              }
            }
            &__notifier {
              width: 5%;
              margin-left: 10px;
            }
            &__subject {
              width: 30%;
              margin-left: 10px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            &__date {
              width: 10%;
              margin-left: 10px;
              white-space: nowrap;
              // overflow: hidden;
              font-weight: bold;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}
</style>
