// https://stackoverflow.com/questions/63724523/how-to-add-typescript-to-vue-3-and-vite-project
declare module "*.vue" {
    import { defineComponent } from "vue";
    const Component: ReturnType<typeof defineComponent>;
    export default Component;
  }