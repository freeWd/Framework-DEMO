import ShoppingCar from "./shopping-car/shopping-car.vue";
import Footer from "../components/Footer.vue";
import FormValid from "./form-valid/form-valid.vue";
import FormValidCustom from "./form-valid-custom/FormValidCustom.vue";
import SearchComponent from "./search/Search.vue";

export default [
  {
    path: "",
    redirect: "/shopping-car"
  },
  {
    path: "/shopping-car",
    name: "shopping-car",
    components: {
      default: ShoppingCar,
      footer: Footer
    }
  },
  {
    path: "/formvalid",
    name: "form-valid",
    component: FormValid
  },
  {
    path: "/formvalid-custom",
    name: "form-valid-custom",
    component: FormValidCustom
  },
  {
    path: "/search",
    component: SearchComponent,
    redirect: "/search/list",
    children: [
      {
        path: "list",
        name: "search-list",
        component: () => import("./search/search-list/SearchList.vue")
      },
      {
        path: "detail/:id",
        name: "search-detail",
        component: () => import("./search/search-detail/SearchDetail.vue"),
        props: true,
        beforeEnter: (to, from, next) => {
          console.log("beforeEnter----->", to);
          next();
        }
      }
    ]
  },
  {
    path: "/testvuex",
    name: "test-vuex",
    component: () => import("./test-vuex/TestVuex.vue")
  }
];
