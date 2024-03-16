<template>
    <section class="w-[22%] border rounded-lg my-4 mx-2 p-2 ">

        <!-- section 1  -->
        <div class="flex items-center mb-4 ">
            <img src="../assets/images/logo.png" alt="logo" class=" w-12 pt-2 pl-2 mr-2 ">
            <div>
                <p class="text-gray-500 text-sm pt-2 font-medium">INC</p>
                <p class="text-gray-700 font-bold text-xl mt-[-7px] ">InnovateHub</p>
            </div>
            <div class="flex items-center flex-1 justify-end pt-2">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2 "
                    size="large" shape="circle" />
            </div>
        </div>

        <!-- section 2  -->
        <div class="border p-2 rounded-t-lg hover:cursor-pointer">
            <div class=" flex items-center mb-2 p-2 hover:bg-gray-100 rounded-lg">
                <img src="../assets/images/pen-tool.png" alt="" class="w-4 mr-2">
                <p class="font-medium text-gray-700 text-lg flex-1">Design Team</p>
                <div>
                    <p class=" border px-2 py-1 rounded text-sm text-end"> ⌘ + 1 </p>
                </div>
            </div>
            <div class=" flex items-center mb-2 border border-gray-200 hover:bg-gray-100 rounded-lg p-2">
                <img src="../assets/images/speaker.png" alt="" class="w-4 mr-2">
                <p class="font-medium text-gray-700 text-lg flex-1">Marketing Team</p>
                <div>
                    <p class=" border px-2 py-1 rounded text-sm text-end"> ⌘ + 2 </p>
                </div>
            </div>
            <div class=" flex items-center  p-2 hover:bg-gray-100 rounded-lg">
                <img src="../assets/images/html.png" alt="" class="w-4 mr-2">
                <p class="font-medium text-gray-700 text-lg flex-1">Development Team</p>
                <div>
                    <p class=" border px-2 py-1 rounded text-sm text-end"> ⌘ + 3 </p>
                </div>
            </div>
        </div>
        <div class="border border-t-0 rounded-b-lg flex p-2 items-center  hover:cursor-pointer mb-4 hover:bg-gray-100 ">
            <img src="../assets/images/more.png" alt="" class="ml-2 w-4 mr-4">
            <p class="font-medium text-gray-400 text-lg flex-1"> Create A Team </p>

        </div>

        <!-- section 3  -->

        <div class="flex p-2 hover:cursor-pointer">
            <p class="font-medium text-gray-400 text-lg flex-1"> FOLDERS </p>
            <p class="font-normal text-gray-400 text-2xl flex-1 text-end mr-4"> + </p>
        </div>

        <PanelMenu :model="items" class="w-full md:w-20rem  mb-36">
            <template #item="{ item }">
                <a v-ripple class="flex items-center px-3 py-2 cursor-pointer">
                    <span :class="[item.icon, 'text-primary']" />
                    <span :class="['ml-2', { 'font-semibold': item.items }]">{{ item.label }}</span>
                    <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                    <span v-if="item.shortcut"
                        class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{
            item.shortcut
                        }}</span>
                </a>
            </template>
        </PanelMenu>


        <div class=" flex items-center mb-2 p-2 hover:bg-gray-100 ">
            <img src="../assets/images/add-friend.png" alt="" class="w-4 mr-2">
            <p class="font-bold text-gray-700 text-lg flex-1"> Invite Teammates </p>
        </div>
        <div class=" flex items-center mb-2 p-2 hover:cursor-pointer hover:bg-gray-100">
            <img src="../assets/images/question.png" alt="" class="w-4 mr-2">
            <p class="font-bold text-gray-700 text-lg flex-1"> Help and first steps</p>
        </div>
        <div class=" flex items-center mb-2 p-2 bg-gray-100 rounded-lg hover:cursor-pointer hover:bg-gray-100">
            <img src="../assets/images/number-7.png" alt="" class="w-5 mr-2">
            <p class="font-bold text-gray-700 text-lg flex-1"> days left on trial</p>
            <p class="bg-black text-white font-bold p-2 rounded-lg">Add billing</p>
        </div>

    </section>
</template>

<script>
import Avatar from 'primevue/avatar';
import PanelMenu from 'primevue/panelmenu';

export default {
    components: {
        PanelMenu,
        Avatar
    },
    data() {
        return {
            items: [
                {
                    label: 'Products',
                    icon: 'pi pi-file',
                    badge: 5,
                    items: [
                        {
                            label: 'Compose',
                            icon: 'pi pi-file-edit',
                            shortcut: '⌘+N'
                        },
                        {
                            label: 'Inbox',
                            icon: 'pi pi-inbox',
                            badge: 5
                        },
                        {
                            label: 'Sent',
                            icon: 'pi pi-send',
                            shortcut: '⌘+S'
                        },
                        {
                            label: 'Trash',
                            icon: 'pi pi-trash',
                            shortcut: '⌘+T'
                        }
                    ]
                },
                {
                    label: 'Sales',
                    icon: 'pi pi-file',
                    shortcut: '⌘+R',
                    items: [
                        {
                            label: 'Sales',
                            icon: 'pi pi-chart-line',
                            badge: 3
                        },
                        {
                            label: 'Products',
                            icon: 'pi pi-list',
                            badge: 6
                        }
                    ]
                },
                {
                    label: 'Design',
                    icon: 'pi pi-file',
                    shortcut: '⌘+W',
                    items: [
                        {
                            label: 'Settings',
                            icon: 'pi pi-cog',
                            shortcut: '⌘+O'
                        },
                        {
                            label: 'Privacy',
                            icon: 'pi pi-shield',
                            shortcut: '⌘+P'
                        }
                    ]
                },
                {
                    label: "Office",
                    icon: 'pi pi-file',
                    items: [
                        {
                            label: 'Settings',
                            icon: 'pi pi-cog',
                            shortcut: '⌘+O'
                        },
                        {
                            label: 'Privacy',
                            icon: 'pi pi-shield',
                            shortcut: '⌘+P'
                        }
                    ]
                },
                {
                    label: "Legal",
                    icon: 'pi pi-file',
                    items: [
                        {
                            label: 'Settings',
                            icon: 'pi pi-cog',
                            shortcut: '⌘+O'
                        },
                        {
                            label: 'Privacy',
                            icon: 'pi pi-shield',
                            shortcut: '⌘+P'
                        }
                    ]
                },
            ]
        };
    }
}
</script>