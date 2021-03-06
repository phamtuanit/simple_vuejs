import Store from "../store/store.js";
import Helper from "../utility/component-helper.js"

Vue.component("phone-item", Helper.loadComponent('phoneItem.js'));

export default {
  templateFile: "shop.html",
  components: {
  },
  data() {
    return {
      products: Store.instance.phones,
      store: Store.instance,
      categories: Store.instance.getCategories("phone"),
      currPrdType: "phone",
      cartItemCount: 0
    };
  },
  created() {
    console.info("Shop component is initialized");
  },
  mounted() {
    const that = this;
    this.store.fetch(function (store) {
      console.info(that.products);
    });
  },
  methods: {
    addProductToCart(phone) {
      this.store.addProductToCart(phone.type, phone.id);
      var total = 0;
      this.store.cart.forEach(i => {
        total += i.quantity;
      });
      this.cartItemCount = total;
    },
    onChange(event) {
      console.log(event.target);
      this.$emit("input", event.target.checked)
    },
    changePrdType(prdType) {
      this.prdType = prdType;
      this.categories = this.store.getCategories(prdType);
    }
  },
};