<script lang="ts" setup>
import { ref, $navigateBack } from 'nativescript-vue';
import { enableLargeTitle } from './util';
const items = ref([1, 2, 3, 4]);
</script>

<template>
  <Page @loaded="enableLargeTitle">
    <ActionBar title="Color Detail">
      <NavigationButton text="Colors" android:icon="~/back.png" @tap="$navigateBack" />
    </ActionBar>  
    <CollectionView :items="items" iosOverflowSafeArea="true" scrollBarIndicatorVisible="false" class="pb-4">
      <template #default="{ item }">
        <StackLayout>
          <GridLayout class="rounded-2xl h-[300] mx-4 mt-5" backgroundColor="blue"> </GridLayout>
        </StackLayout>
      </template>
    </CollectionView>
  </Page>
</template>
