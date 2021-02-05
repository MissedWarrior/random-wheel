<template>
  <div :class="$style.wrapper">
    <Simplebar>
      <div :class="$style.inner">
        <div v-for="item in list" :class="$style.listItem">

          <Point>{{ item.value }}</Point>

          <div :class="$style.iconWrapper">
            <Button
              appearance="danger"
              view="squared"
              :class="$style.button"
              ref="button"
              @click="removePoint(item.id)"
            >
              <div :class="$style.icon">
                <Trash/>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </Simplebar>
  </div>
</template>

<script>
  import Point from '/@/components/Point.vue';
  import Simplebar from '/@/components/Simplebar.vue';
  import Button from '/@/components/Button.vue';
  import Trash from '/@/components/icons/Trash.vue';

  export default {
    name: 'PointsList',
    components: { Trash, Button, Point, Simplebar },
    props: {
      list: {
        type: Array,
        required: true,
      }
    },
    methods: {
      removePoint(id) {
        this.$emit('remove-point', id);
      },
    },
  };
</script>

<style module lang="scss">
  .wrapper {
    height: 300px;
    overflow: auto;
    border: 2px solid var(--border);
  }

  .inner {
    padding: 11px;
  }

  .list-item {
    margin-bottom: 10px;
    display: flex;
    font-size: 1rem;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .icon-wrapper {
    margin-left: 15px;
  }

  .button {
    width: 3em;
    height: 3em;
  }

  .icon {
    width: 2rem;
    display: flex;
    align-items: center;
  }
</style>
