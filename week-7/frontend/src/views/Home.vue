<template>
  <div class="home">
    HERE
    <span v-for="(item, index) in items" :key="index">
      <ItemCard :item="item" />
    </span>
  </div>
</template>

<script>
import ItemCard from '@/components/ItemCard.vue';

export default {
  name: 'Home',
  components: {
    ItemCard,
  },
  data: () => ({
    items: [
      {
        title: 'Title',
        subtitle: 'Subtitle',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, s',
        users: [
          { firstName: 'John', lastName: 'Doe' },
          { firstName: 'Jason', lastName: 'Smith' },
        ],
      },
      {
        title: 'Title',
        subtitle: 'Subtitle',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, s',
        users: [
          { firstName: 'Kate', lastName: 'Chang' },
          { firstName: 'Louis', lastName: 'Andres' },
        ],
      },
    ],
  }),
};
</script>
