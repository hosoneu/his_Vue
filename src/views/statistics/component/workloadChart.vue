<script>
  import { Bar} from 'vue-chartjs'
  import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
  export default {
    extends: Bar,
    name:'workloadChart',
    props: {
      chartData:Object,
    },
    watch:{
      'chartData':'reload'
    },
    mounted () {
      this.renderChart(this.chartData,
        {
          responsive: true,
          maintainAspectRatio: true,
          tooltips: {
            enabled: false,
            custom: CustomTooltips,
            intersect: true,
            mode: 'index',
            position: 'nearest',
            callbacks: {
              labelColor: function (tooltipItem, chart) {
                return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].backgroundColor }
              }
            }
          }
        }
      )
    },
    methods:{
      reload(){
        this.renderChart(this.chartData,
          {
            responsive: true,
            maintainAspectRatio: true,
            tooltips: {
              enabled: false,
              custom: CustomTooltips,
              intersect: true,
              mode: 'index',
              position: 'nearest',
              callbacks: {
                labelColor: function (tooltipItem, chart) {
                  return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].backgroundColor }
                }
              }
            }
          }
        )
      }
    }
  }
</script>
