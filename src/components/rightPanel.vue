<template>
    <section class="h-full w-[75%] border rounded-lg my-4 mx-2 ">
        <!-- section 1  -->
        <div class="flex justify-center  border-b px-4 pt-6 pb-3">
            <h1 class="text-xl font-bold text-gray-700 flex-1">Products</h1>
            <FloatLabel class="mr-4">
                <IconField iconPosition="left">
                    <InputIcon class="pi pi-search"> </InputIcon>
                    <InputText v-model="filters['global'].value" id="search" />
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
        <DataTable v-model:filters="filters" :globalFilterFields="['brandName', 'tags', 'categories']"
            v-model:selection="selectedBrands" :value="products" showGridlines tableStyle="min-width: 10rem">
            <template #empty> No Brands found. </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="brands.name" header="Brands" sortable class="w-56">
                <template #body="{ data }">
                    <div class="flex gap-2 items-center">
                        <img :src="data.brands.img" alt="img" width="20px">
                        <p class="font-medium text-lg text-gray-700">{{ data.brands.name }} </p>
                    </div>
                </template>
            </Column>
            <Column field="description" header="Description" class="w-60"></Column>
            <Column header="Members">
                <template #body="{ data }">
                    <AvatarGroup v-if="data" class="ml-4">
                        <Avatar v-for="img in data.members" :key="img"
                            :image="`https://primefaces.org/cdn/primevue/images/avatar/${img.img}`" class=" "
                            shape="circle" />
                    </AvatarGroup>
                </template>
            </Column>
            <Column field="categories" sortable header="Categories"></Column>
            <Column field="tags" sortable header="Tags"></Column>
            <Column field="nextMeeting" header="Next Meeting"></Column>
        </DataTable>
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
        Avatar
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
    },
    data() {
        return {
            filters: null,
            products: [
                { brands: { name: 'Wix', img: "https://firebasestorage.googleapis.com/v0/b/saini-lifters.appspot.com/o/folder%2Fwix.png?alt=media&token=2e4bb582-eefa-43f3-9b9b-f4bc2de88b94" }, description: 'Description 1', members: [{ img: "onyamalimba.png" }, { img: "amyelsner.png" }, { img: "asiyajavayant.png" }, { img: "asiyajavayant.png" }, { img: "onyamalimba.png" },], categories: 'Category 1', tags: 'Tag 1', nextMeeting: '2024-03-16' },
                { brands: { name: 'Facebook', img: "https://firebasestorage.googleapis.com/v0/b/saini-lifters.appspot.com/o/folder%2Ffacebook.png?alt=media&token=f5df52ee-5b31-4cfd-8d66-3f27bf2a6ee0" }, description: 'Description 2', members: [{ img: "amyelsner.png" }, { img: "asiyajavayant.png" }, { img: "onyamalimba.png" }, { img: 'xuxuefeng.png' }, { img: "onyamalimba.png" }], categories: 'Category 2', tags: 'Tag 2', nextMeeting: '2024-03-17' },
                { brands: { name: 'Apple', img: "https://firebasestorage.googleapis.com/v0/b/saini-lifters.appspot.com/o/folder%2Fapple-logo.png?alt=media&token=f91a1bb2-bd70-46b4-b33e-676f276cf233" }, description: 'Description 3', members: [{ img: "asiyajavayant.png" }, { img: "onyamalimba.png" }, { img: "asiyajavayant.png" }, { img: "onyamalimba.png" },], categories: 'Category 3', tags: 'Tag 3', nextMeeting: '2024-03-18' },
                { brands: { name: 'Microsoft', img: "https://firebasestorage.googleapis.com/v0/b/saini-lifters.appspot.com/o/folder%2Fmicrosoft.png?alt=media&token=6ce628ea-b57b-4379-a4d5-429f3663ff07" }, description: 'Description 4', members: [{ img: "amyelsner.png" }, { img: "asiyajavayant.png" }, { img: "amyelsner.png" }, { img: 'xuxuefeng.png' }, { img: "onyamalimba.png" }, { img: 'xuxuefeng.png' }, { img: "onyamalimba.png" }], categories: 'Category 4', tags: 'Tag 4', nextMeeting: '2024-03-19' },
                { brands: { name: 'Shopify', img: "https://firebasestorage.googleapis.com/v0/b/saini-lifters.appspot.com/o/folder%2Fshopify.png?alt=media&token=6205bffb-30c9-4e5b-a61a-a8ae748b8157" }, description: 'Description 5', members: [{ img: "amyelsner.png" }, { img: "asiyajavayant.png" }, { img: "onyamalimba.png" }, { img: 'xuxuefeng.png' }, { img: "onyamalimba.png" }], categories: 'Category 5', tags: 'Tag 5', nextMeeting: '2024-03-17' },
                { brands: { name: 'Google', img: "https://firebasestorage.googleapis.com/v0/b/saini-lifters.appspot.com/o/folder%2Fgoogle.png?alt=media&token=69b77d72-4167-4599-8bc1-c808bd807e66" }, description: 'Description 6', members: [{ img: "amyelsner.png" }, { img: "asiyajavayant.png" }, { img: "onyamalimba.png" }, { img: 'xuxuefeng.png' }, { img: "onyamalimba.png" }], categories: 'Category 6', tags: 'Tag 6', nextMeeting: '2024-03-17' },
                { brands: { name: 'Paypal', img: "https://firebasestorage.googleapis.com/v0/b/saini-lifters.appspot.com/o/folder%2Fpaypal.png?alt=media&token=bc044345-d31f-4ff6-b617-3e92da96ea03" }, description: 'Description 7', members: [{ img: "amyelsner.png" }, { img: "asiyajavayant.png" }, { img: "onyamalimba.png" }, { img: 'xuxuefeng.png' }, { img: "onyamalimba.png" }], categories: 'Category 7', tags: 'Tag 7', nextMeeting: '2024-03-17' },
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