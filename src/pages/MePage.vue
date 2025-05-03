<template>
  <q-page class="q-pa-md flex flex-center">
    <!-- Sparkline Charts -->
    <div class="q-mt-md q-mb-md">
      <div class="col-md-4">
        <q-card class="q-my-md">
          <apexchart type="line" :options="sparkOptions1" :series="sparkSeries1" />
        </q-card>
      </div>
      <div class="col-md-4">
        <q-card class="q-my-md">
          <apexchart type="line" :options="sparkOptions2" :series="sparkSeries2" />
        </q-card>
      </div>
      <div class="col-md-4">
        <q-card class="q-my-md">
          <apexchart type="line" :options="sparkOptions3" :series="sparkSeries3" />
        </q-card>
      </div>
    </div>

    <!-- Bar and Donut Charts -->
    <div class="q-mt-lg q-mb-md">
      <div class="col-md-6">
        <q-card class="q-my-md">
          <apexchart type="bar" :options="barOptions" :series="barSeries" />
        </q-card>
      </div>
      <div class="col-md-6">
        <q-card class="q-my-md">
          <apexchart type="donut" :options="donutOptions" :series="donutSeries" />
        </q-card>
      </div>
    </div>

    <!-- Area and Line Charts -->
    <div class="q-mt-md q-mb-md">
      <div class="col-md-6">
        <q-card class="q-my-md">
          <apexchart type="area" :options="areaOptions" :series="areaSeries" />
        </q-card>
      </div>
      <div class="col-md-6">
        <q-card class="q-my-md">
          <apexchart type="line" :options="lineOptions" :series="lineSeries" />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

export default defineComponent({
  name: 'MePage',
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const sparklineData = [
      47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19,
      46,
    ]
    const colorPalette = ['#00D8B6', '#008FFB', '#FEB019', '#FF4560', '#775DD0']

    const trigoSeries = (cnt, strength) => {
      var data = []
      for (var i = 0; i < cnt; i++) {
        data.push((Math.sin(i / strength) * (i / strength) + i / strength + 1) * (strength * 2))
      }

      return data
    }

    const randomizeArray = (arg) => {
      var array = arg.slice()
      var currentIndex = array.length,
        temporaryValue,
        randomIndex

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }

      return array
    }

    const charts = reactive({
      // Sparkline chart data
      sparkOptions1: {
        id: 'sparkline1',
        group: 'sparklines',
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true,
        },

        stroke: {
          curve: 'straight',
        },
        fill: {
          opacity: 1,
        },
        labels: [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`),
        yaxis: {
          min: 0,
        },
        xaxis: {
          type: 'datetime',
        },
        colors: colorPalette,
        title: {
          text: '$424,652',
          offsetX: 30,
          style: {
            fontSize: '24px',
            cssClass: 'apexcharts-yaxis-title',
          },
        },
        subtitle: {
          text: 'Sales',
          offsetX: 30,
          style: {
            fontSize: '14px',
            cssClass: 'apexcharts-yaxis-title',
          },
        },
      },
      sparkSeries1: [
        {
          name: 'Sales',
          data: randomizeArray(sparklineData),
        },
      ],

      sparkOptions2: {
        id: 'sparkline2',
        group: 'sparklines',
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true,
        },
        stroke: {
          curve: 'straight',
        },
        fill: {
          opacity: 1,
        },
        labels: [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`),
        yaxis: {
          min: 0,
        },
        xaxis: {
          type: 'datetime',
        },
        colors: [colorPalette[2]],
        title: {
          text: '$235,312',
          offsetX: 30,
          style: {
            fontSize: '24px',
            cssClass: 'apexcharts-yaxis-title',
          },
        },
        subtitle: {
          text: 'Expenses',
          offsetX: 30,
          style: {
            fontSize: '14px',
            cssClass: 'apexcharts-yaxis-title',
          },
        },
      },
      sparkSeries2: [
        {
          name: 'Expenses',
          data: randomizeArray(sparklineData),
        },
      ],

      sparkOptions3: {
        id: 'sparkline3',
        group: 'sparklines',
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true,
        },
        stroke: {
          curve: 'straight',
        },
        fill: {
          opacity: 1,
        },
        labels: [...Array(24).keys()].map((n) => `2018-09-0${n + 1}`),
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          min: 0,
        },
        colors: [colorPalette[4]],
        title: {
          text: '$135,965',
          offsetX: 30,
          style: {
            fontSize: '24px',
            cssClass: 'apexcharts-yaxis-title',
          },
        },
        subtitle: {
          text: 'Profits',
          offsetX: 30,
          style: {
            fontSize: '14px',
            cssClass: 'apexcharts-yaxis-title',
          },
        },
      },

      sparkSeries3: [
        {
          name: 'Profits',
          data: randomizeArray(sparklineData),
        },
      ],

      // Bar chart data
      barOptions: {
        chart: { type: 'bar', height: 380, width: '100%', stacked: true },
        plotOptions: {
          bar: {
            columnWidth: '45%',
          },
        },
        colors: colorPalette,
        labels: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        xaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            style: {
              colors: '#78909c',
            },
          },
        },
        title: {
          text: 'Monthly Sales',
          align: 'left',
          style: {
            fontSize: '18px',
          },
        },
      },
      barSeries: [
        {
          name: 'Clothing',
          data: [42, 52, 16, 55, 59, 51, 45, 32, 26, 33, 44, 51, 42, 56],
        },
        {
          name: 'Food Products',
          data: [6, 12, 4, 7, 5, 3, 6, 4, 3, 3, 5, 6, 7, 4],
        },
      ],

      // Donut chart data
      donutOptions: {
        chart: { type: 'donut', width: '100%', height: 400 },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            customScale: 0.8,
            donut: {
              size: '75%',
            },
            offsetY: 20,
          },
          stroke: {
            colors: undefined,
          },
        },
        colors: colorPalette,
        title: {
          text: 'Department Sales',
          style: {
            fontSize: '18px',
          },
        },
        labels: ['Clothing', 'Food Products', 'Electronics', 'Kitchen Utility', 'Gardening'],
        legend: {
          position: 'left',
          offsetY: 80,
        },
      },
      donutSeries: [21, 23, 19, 14, 6],

      // Area chart data
      areaOptions: {
        chart: {
          height: 340,
          type: 'area',
          zoom: {
            enabled: false,
          },
        },
        stroke: {
          curve: 'straight',
        },
        colors: colorPalette,
        fill: {
          opacity: 1,
        },
        title: {
          text: 'Daily Visits Insights',
          align: 'left',
          style: {
            fontSize: '18px',
          },
        },
        markers: {
          size: 0,
          style: 'hollow',
          hover: {
            opacity: 5,
          },
        },
        tooltip: {
          intersect: true,
          shared: false,
        },
        xaxis: {
          tooltip: {
            enabled: false,
          },
          labels: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          stepSize: 3,
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            style: {
              colors: '#78909c',
            },
          },
        },
        legend: {
          show: false,
        },
      },
      areaSeries: [
        {
          name: 'Blog',
          data: [
            {
              x: 0,
              y: 0,
            },
            {
              x: 4,
              y: 5,
            },
            {
              x: 5,
              y: 3,
            },
            {
              x: 9,
              y: 8,
            },
            {
              x: 14,
              y: 4,
            },
            {
              x: 18,
              y: 5,
            },
            {
              x: 25,
              y: 0,
            },
          ],
        },
        {
          name: 'Social Media',
          data: [
            {
              x: 0,
              y: 0,
            },
            {
              x: 4,
              y: 6,
            },
            {
              x: 5,
              y: 4,
            },
            {
              x: 14,
              y: 8,
            },
            {
              x: 18,
              y: 5.5,
            },
            {
              x: 21,
              y: 6,
            },
            {
              x: 25,
              y: 0,
            },
          ],
        },
        {
          name: 'External',
          data: [
            {
              x: 0,
              y: 0,
            },
            {
              x: 2,
              y: 5,
            },
            {
              x: 5,
              y: 4,
            },
            {
              x: 10,
              y: 11,
            },
            {
              x: 14,
              y: 4,
            },
            {
              x: 18,
              y: 8,
            },
            {
              x: 25,
              y: 0,
            },
          ],
        },
      ],

      // Line chart data
      lineOptions: {
        chart: {
          height: 340,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        plotOptions: {
          stroke: {
            width: 4,
            curve: 'smooth',
          },
        },
        colors: colorPalette,
        title: {
          floating: false,
          text: 'Customers',
          align: 'left',
          style: {
            fontSize: '18px',
          },
        },
        subtitle: {
          text: '168,215',
          align: 'center',
          margin: 30,
          offsetY: 40,
          style: {
            color: '#222',
            fontSize: '24px',
          },
        },
        markers: {
          size: 0,
        },
        grid: {},
        xaxis: {
          labels: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          tickAmount: 2,
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          min: 0,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetY: -20,
          offsetX: -30,
        },
      },
      lineSeries: [
        {
          name: 'Day Time',
          data: trigoSeries(52, 20),
        },
        {
          name: 'Night Time',
          data: trigoSeries(40, 38),
        },
      ],
    })

    return {
      ...charts,
    }
  },
})
</script>
