<template>
  <div class="home">
    <GmapMap
      class="map"
      :center="{lat:52.51, lng:13.4}"
      :zoom="12"
      :options="{
        clickableIcons: false,
        disableDefaultUI: true,
        draggable: false,
        styles: mapStyles,
      }"
    >
      <GmapMarker
        :key="index"
        v-for="(job, index) in jobs"
        :position="{
          lat: job.point.geopoint._lat,
          lng: job.point.geopoint._long,
        }"
        :options="{
          icon: {
            url: `/${job.state}.png`,
            scaledSize: {
              height: 79,
              width: 52
            }
          }
        }"
      />
    </GmapMap>
    <div class="data">
      <Card class="jobs" elevated>
        <h3 class="headline">Current Open Requests in Berlin</h3>
        <div class="legend">
          <div class="item">
            <div class="status unassigned" />
            <span class="name">Unassigned</span>
          </div>
          <div class="item">
            <div class="status assigned" />
            <span class="name">Assigned</span>
          </div>
          <div class="item">
            <div class="status delivered" />
            <span class="name">Delivered</span>
          </div>
        </div>
        <div class="jobCards">
          <transition-group name="list">
            <div 
              class="jobCardWithStatus"
              v-for="job in jobs"
              :key="job.id"
            >
              <div class="status" :class="[ job.state ]"/>
              <JobCard 
                class="job"
                :jobId="job.id"
                collapsed
                :tip="job.tip"
                :title="job.thing"
              />
            </div>
          </transition-group>
        </div>
      </Card>
      <Card class="controls" elevated>
        <h3 class="headline">Simulator controls</h3>
        <BingoButton class="control" :disabled="isTicking" @clicked="start">
          Start simulator
        </BingoButton>
        <BingoButton class="control" :disabled="!isTicking" @clicked="stop">
          Stop simulator
        </BingoButton>
        <h3 class="headline">Simulator active: {{ isTicking }}</h3>
      </Card>
      <Card class="log" elevated>
        <h3 class="headline">Simulator activity</h3>
        <div class="loglines">
          <transition-group name="list">
            <div class="entry" v-for="(entry, index) in loglines" :key="index">
              <p class="code">{{ entry.code }}</p>
              <p class="jobName">{{ entry.jobName }}</p>
            </div>
          </transition-group>
        </div>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Card, JobCard, BingoButton } from 'simsalabim-design';

import Tick, { ticker } from '@/helpers/tick';
import decimator from '@/actions/decimator';
import eventBus from '@/eventBus';

import mapStyles from './mapStyles';

interface logline {
  code: string;
  jobName: string;
}

@Component({
  components: {
    Card,
    JobCard,
    BingoButton,
  }
})
export default class Home extends Vue {
  tick = new Tick(1000);
  mapStyles = mapStyles;
  loglines: logline[] = [];

  get jobs() {
    return this.$store.getters['jobs/allJobs'];
  }

  start() {
    this.tick.start();
  }

  stop() {
    this.tick.stop();
  }

  get isTicking() {
    return this.tick.isTicking;
  }

  handleNewEvent(payload: any): void {
    if (this.loglines.length > 30) {
      this.loglines.shift()
    }

    this.loglines.push({
      code: payload.code,
      jobName: payload.job.thing,
    })
  }

  created(): void {
    ticker.$on('tick', () => {
      decimator();
    });

    eventBus.$on('event', (payload: any) => {
      this.handleNewEvent(payload);
    })
  }
}
</script>

<style scoped lang="sass" src="./Home.sass" />
