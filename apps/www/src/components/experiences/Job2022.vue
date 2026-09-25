<script lang="ts" setup>
import { Markdown as down } from '@navifox/ui';
import IconDjangoRESTFramework from '~icons/devicon/djangorest-wordmark';
import IconGrafana from '~icons/devicon/grafana';
import IconPostgreSQL from '~icons/devicon/postgresql';
import IconRedis from '~icons/devicon/redis';
import IconVue from '~icons/devicon/vuejs';
import IconPython from '~icons/logos/python';
import IconApifox from '~icons/simple-icons/apifox';
import IconDjango from '~icons/skill-icons/django';
import IconJavaScript from '~icons/skill-icons/javascript';

import Experience from '#/components/Experience.vue';
</script>

<template>
    <Experience project="景区生态系统" start="2022.3" team="广州某某科技" title="后端开发">
        <template #stack>
            <span class="flex flex-nowrap items-center gap-1"><IconPython class="size-4" /><span>Python</span></span>
            <span class="flex flex-nowrap items-center gap-1"><IconDjango class="size-4" /><span>Django</span></span>
            <span class="flex flex-nowrap items-center gap-1">
                <IconDjangoRESTFramework class="size-4" /><span>Django REST Framework</span>
            </span>
            <span class="flex flex-nowrap items-center gap-1"><IconVue class="size-4" /><span>Vue</span></span>
            <span class="flex flex-nowrap items-center gap-1">
                <IconJavaScript class="size-4" /><span>JavaScript</span>
            </span>
            <span class="flex flex-nowrap items-center gap-1">
                <IconPostgreSQL class="size-4" /><span>PostgreSQL</span>
            </span>
            <span class="flex flex-nowrap items-center gap-1"><IconRedis class="size-4" /><span>Redis</span></span>
            <span class="flex flex-nowrap items-center gap-1"><IconApifox class="size-4" /><span>Apifox</span></span>
            <span class="flex flex-nowrap items-center gap-1"><IconGrafana class="size-4" /><span>Grafana</span></span>
        </template>
        <p>
            <span>公司深耕旅游行业，摸索自研了一整套 SaaS 景区生态系统，</span>
            <span>而我主要参与了其中几个子服务的建设和维护。</span>
            <span>目前所有服务均面向三个层面开发：景区、自营商户/入驻商户、员工/顾客。</span>
        </p>
        <p>
            <down>**餐饮零售**，包含收银软硬件，面向餐饮与零售两大业务场景做通用化设计，</down>
            <down>`2023.6` 立项至今仍在迭代。立项阶段主要负责 WMS 部分的 ORM 模型设计，</down>
            <span>包括商品、SKU、规格、小料、分类、标签、计量单位、品牌、供应商、购物车等，</span>
            <span>后续转由个人独立负责，又设计了预设套餐、现选套餐、会员等。</span>
        </p>
        <p>
            <down>**线上电商**，包含商家端 Web 后台、客户端小程序、员工端公众号三个场景。</down>
            <span>后台主要有用户、帐套（角色）、商品、两套分类、促销活动、景区内外地址、订单、退款等管理；</span>
            <span>员工通过公众号绑定接收线上下单通知，点击跳转到免登录 H5 页面浏览来执行备货、打包、发货等操作；</span>
            <span>小程序包含简单的商品、订单、退款、地址等管理，可浏览实时或定时开启的促销活动。</span>
        </p>
    </Experience>
</template>
