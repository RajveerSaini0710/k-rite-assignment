<template>
    <section class="  w-[75%] border rounded-lg my-4 mx-2 ">
        <!-- section 1  -->
        <div class="flex justify-center  border-b px-4 pt-6 pb-3">
            <h1 class="text-xl font-bold text-gray-700 flex-1">Products</h1>
            <FloatLabel class="mr-4">
                <IconField iconPosition="left">
                    <InputIcon class="pi pi-search"> </InputIcon>
                    <InputText v-model="filters['global'].value" id="search" @input="updateGlobalFilter" />
                </IconField>
                <label for="search" class="text-gray-400 indent-6 ">Search for...</label>
            </FloatLabel>
            <i class="pi pi-clone text-lg flex items-center border py-1 px-2 rounded-lg mr-2"></i>
            <i class="pi pi-cog text-lg flex items-center border py-2 px-2 rounded-lg mr-2"></i>
        </div>

        <!-- section 2 -->
        <div class="flex items-center border-b">
            <Menubar :model="items1" class="flex-1" />
            <div class=" flex items-center p-2 border rounded-lg mr-2 hover:cursor-pointer">
                <i class="pi pi-plus-circle mr-2"></i>
                <p class="font-medium text-gray-700 text-sm  flex-1">Meeting</p>
            </div>
            <div class=" flex items-center p-2 border rounded-lg mr-4 hover:cursor-pointer">
                <i class="pi pi-download mr-2"></i>
                <p class="font-medium text-gray-700 text-sm  flex-1">Import / Export</p>
            </div>
        </div>

        <!-- section 3 -->
        <DataTable v-model:filters="filters" :globalFilterFields="['brands.name', 'tags', 'categories']"
            v-model:selection="selectedBrands" dataKey="id" :value="products" showGridlines
            tableStyle="min-width: 10rem">
            <template #empty> No Brands found. </template>
            <Column headerStyle="width: 3rem">
                <template #body="{ data }">
                    <input type="checkbox" v-model="data.selected" class="hover:cursor-pointer">
                </template>
            </Column>
            <Column field="brands.name" header="Brands" sortable class="w-56">
                <template #body="{ data }">
                    <div class="flex gap-2 items-center">
                        <img :src="data.brands.img" alt="img" width="20px">
                        <p class="font-medium text-lg text-gray-700">{{ data.brands.name }} </p>
                    </div>
                </template>
            </Column>
            <Column field="description" header="Description"></Column>
            <Column header="Members">
                <template #body="{ data }">
                    <AvatarGroup v-if="data" class="ml-4">
                        <Avatar v-for="img in data.members" :key="img"
                            :image="`https://primefaces.org/cdn/primevue/images/avatar/${img.img}`" class=" "
                            shape="circle" />
                    </AvatarGroup>
                </template>
            </Column>
            <Column field="categories" sortable header="Categories">
                <template #body="{ data }">
                    <Tag v-for="category in data.categories" :value="category.name" :severity="category.severity"
                        class="mr-1"></Tag>
                </template>
            </Column>
            <Column field="tags" sortable header="Tags">
                <template #body="{ data }">
                    <p class="p-2 bg-gray-100 rounded-full  w-full">{{ data.tags }}</p>
                </template>
            </Column>
            <Column field="nextMeeting" header="Next Meeting">
                <template #body="{ data }">
                    <Tag :value="data.nextMeeting.name" :severity="data.nextMeeting.severity" class="mr-1"></Tag>
                </template>
            </Column>
        </DataTable>

        <!-- section 4  -->
        <div class="flex justify-center mt-20" v-if="this.selectedBrands.length">
            <div class="border flex p-2 rounded-lg items-center ">
                <span class="bg-black text-white px-2 rounded-lg mr-1">{{ selectedBrands.length }} </span>
                <span class="mr-4"> Selected</span>
                <div class=" flex items-center p-2 border rounded-lg mr-2 hover:cursor-pointer" label="Bottom Right"
                    @click="archiveProduct">
                    <Toast position="bottom-right" group="br" />
                    <i class="pi pi-box mr-2"></i>
                    <p class="font-medium text-gray-700 text-sm  flex-1">Archive</p>
                </div>
                <div class=" flex items-center p-2 border rounded-lg mr-2 hover:cursor-pointer" @click="deleteProduct">
                    <i class="pi pi-trash mr-2 text-red-500"></i>
                    <p class="font-medium  text-sm  flex-1 text-red-500">Delete</p>
                </div>
                <div class=" flex items-center p-2 border rounded-lg mr-4 hover:cursor-pointer " @click="moreProduct">
                    <i class="pi pi-plus-circle mr-2"></i>
                    <p class="font-medium text-gray-700 text-sm  flex-1">More</p>
                </div>
                <i class="pi pi-times hover:cursor-pointer" @click="cancelProductSelect"></i>
            </div>
        </div>
    </section>
</template>

<script>
import InputText from 'primevue/inputtext';
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/iconfield';
import FloatLabel from 'primevue/floatlabel';
import Menubar from 'primevue/menubar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Tag from 'primevue/tag';
import Toast from 'primevue/toast';

export default {
    components: {
        InputText,
        FloatLabel,
        InputIcon,
        IconField,
        Menubar,
        DataTable,
        Column,
        AvatarGroup,
        Avatar,
        Tag,
        Toast

    },
    created() {
        this.initFilters();
    },
    methods: {
        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                brands: { value: null, matchMode: FilterMatchMode.IN },
                tags: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
                categories: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            };
        },
        updateGlobalFilter() {
            this.$nextTick(() => {
                this.$refs.dt.filter(this.filters['global'].value, 'brands.name', 'contains');
            });
        },
        archiveProduct() {
            this.$toast.add({ severity: 'success', summary: 'Archive Product', group: 'br', detail: 'Products are archived', life: 3000 });
        },
        deleteProduct() {
            this.$toast.add({ severity: 'danger', summary: 'Delete Product', group: 'br', detail: 'Products are Deleted', life: 3000 });
        },
        moreProduct() {
            this.$toast.add({ severity: 'info', summary: 'More Product', group: 'br', detail: 'More are archived', life: 3000 });
        },
        cancelProductSelect() {
            this.products.forEach(product => {
                product.selected = false;
            });
        }
    },
    watch: {
        // Watch for changes to the products array
        products: {
            handler(newProducts) {
                // Update selectedBrands with selected products
                this.selectedBrands = newProducts.filter(product => product.selected);
            },
            deep: true // Watch for nested changes within the products array
        }
    },
    data() {
        return {
            selectedBrands: [],
            filters: null,
            products: [
                { id: 1, selected: false, brands: { name: 'Wix', img: "https://firebasestorage.googleapis.com/v0/b/saini-lifters.appspot.com/o/folder%2Fwix.png?alt=media&token=2e4bb582-eefa-43f3-9b9b-f4bc2de88b94" }, description: 'Description 1', members: [{ img: "onyamalimba.png" }, { img: "amyelsner.png" }, { img: "asiyajavayant.png" }, { img: "asiyajavayant.png" }, { img: "onyamalimba.png" },], categories: [{ name: 'Automation', severity: "warning" }], tags: '#DigitalTransformation', nextMeeting: { name: 'In 30 Minutes', severity: "success" } },
                { id: 2, selected: false, brands: { name: 'Facebook', img: "https://firebasestorage.googleapis.com/v0/b/saini-lifters.appspot.com/o/folder%2Ffacebook.png?alt=media&token=f5df52ee-5b31-4cfd-8d66-3f27bf2a6ee0" }, description: 'Description 2', members: [{ img: "amyelsner.png" }, { img: "asiyajavayant.png" }, { img: "onyamalimba.png" }, { img: 'xuxuefeng.png' }, { img: "onyamalimba.png" }], categories: [{ name: 'B2B', severity: "info" }, { name: "Ecommerce", severity: "success" }], tags: '#technovation', nextMeeting: { name: 'Tomorrow', severity: "info" } },
                { id: 3, selected: false, brands: { name: 'Apple', img: "https://firebasestorage.googleapis.com/v0/b/saini-lifters.appspot.com/o/folder%2Fapple-logo.png?alt=media&token=f91a1bb2-bd70-46b4-b33e-676f276cf233" }, description: 'Description 3', members: [{ img: "asiyajavayant.png" }, { img: "onyamalimba.png" }, { img: "asiyajavayant.png" }, { img: "onyamalimba.png" },], categories: [{ name: 'SAAS', severity: "success" }, { name: "Mobile", severity: "danger" }], tags: '#BuySellOnline', nextMeeting: { name: 'Tomorrow', severity: "info" } },
                { id: 4, selected: false, brands: { name: 'Microsoft', img: "https://firebasestorage.googleapis.com/v0/b/saini-lifters.appspot.com/o/folder%2Fmicrosoft.png?alt=media&token=6ce628ea-b57b-4379-a4d5-429f3663ff07" }, description: 'Description 4', members: [{ img: "amyelsner.png" }, { img: "asiyajavayant.png" }, { img: "amyelsner.png" }, { img: 'xuxuefeng.png' }, { img: "onyamalimba.png" }, { img: 'xuxuefeng.png' }, { img: "onyamalimba.png" }], categories: [{ name: 'Marketplace', severity: "success" }, { name: "Automation", severity: "warning" }], tags: '#BusinessPartnership', nextMeeting: { name: 'In 6 hours', severity: "success" } },
                { id: 5, selected: false, brands: { name: 'Shopify', img: "https://firebasestorage.googleapis.com/v0/b/saini-lifters.appspot.com/o/folder%2Fshopify.png?alt=media&token=6205bffb-30c9-4e5b-a61a-a8ae748b8157" }, description: 'Description 5', members: [{ img: "amyelsner.png" }, { img: "asiyajavayant.png" }, { img: "onyamalimba.png" }, { img: 'xuxuefeng.png' }, { img: "onyamalimba.png" }], categories: [{ name: 'B2B', severity: "info" }, { name: "B2C", severity: "danger" }], tags: '#SmallFinance', nextMeeting: { name: 'No contact', severity: "danger" } },
                { id: 6, selected: false, brands: { name: 'Google', img: "https://firebasestorage.googleapis.com/v0/b/saini-lifters.appspot.com/o/folder%2Fgoogle.png?alt=media&token=69b77d72-4167-4599-8bc1-c808bd807e66" }, description: 'Description 6', members: [{ img: "amyelsner.png" }, { img: "asiyajavayant.png" }, { img: "onyamalimba.png" }, { img: 'xuxuefeng.png' }, { img: "onyamalimba.png" }], categories: [{ name: 'Finance', severity: "success" }, { name: "Automation", severity: "warning" }], tags: '#B2CMarketing', nextMeeting: { name: 'In 1 hours', severity: "success" } },
                { id: 7, selected: false, brands: { name: 'Paypal', img: "https://firebasestorage.googleapis.com/v0/b/saini-lifters.appspot.com/o/folder%2Fpaypal.png?alt=media&token=bc044345-d31f-4ff6-b617-3e92da96ea03" }, description: 'Description 7', members: [{ img: "amyelsner.png" }, { img: "asiyajavayant.png" }, { img: "onyamalimba.png" }, { img: 'xuxuefeng.png' }, { img: "onyamalimba.png" }], categories: [{ name: 'B2B', severity: "info" }, { name: "SAAS", severity: "success" }], tags: '#LogisticTech', nextMeeting: { name: 'Next Month', severity: "warning" } },
            ],
            items1: [
                {
                    label: 'All brands',
                    icon: 'pi pi-slack',
                    items: [
                        {
                            label: 'Apple',
                            icon: 'pi pi-apple'
                        },
                        {
                            label: 'Facebook',
                            icon: 'pi pi-facebook'
                        },
                        {
                            label: 'Twitter',
                            icon: 'pi pi-twitter'
                        },
                        {
                            label: 'Telegram',
                            icon: 'pi pi-telegram'
                        },
                    ]
                },
                {
                    label: 'Desk',
                    items: [
                        {
                            label: 'Apple',
                            icon: 'pi pi-apple'
                        },
                        {
                            label: 'Facebook',
                            icon: 'pi pi-facebook'
                        },
                        {
                            label: 'Twitter',
                            icon: 'pi pi-twitter'
                        },
                        {
                            label: 'Telegram',
                            icon: 'pi pi-telegram'
                        },]
                },
                {
                    label: 'Tags',
                    items: [
                        {
                            label: 'Components',
                            icon: 'pi pi-bolt'
                        },
                        {
                            label: 'Blocks',
                            icon: 'pi pi-server'
                        },
                        {
                            label: 'UI Kit',
                            icon: 'pi pi-pencil'
                        },
                        {
                            label: 'Templates',
                            icon: 'pi pi-palette',
                            items: [
                                {
                                    label: 'Apollo',
                                    icon: 'pi pi-palette'
                                },
                                {
                                    label: 'Ultima',
                                    icon: 'pi pi-palette'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Sort',
                    icon: 'pi pi-sort-amount-down'
                },
                {
                    label: 'Filter',
                    icon: 'pi pi-filter'
                }
            ],



        }
    }
}
</script>
