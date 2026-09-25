<script lang="ts" setup>
import { SkillsBadge } from '@navifox/constants';
import type { Project } from '@navifox/types';
import { Markdown as down } from '@navifox/ui';

import Experience from '#/components/Experience.vue';

const project: Project = {
    text: '景区生态系统',
    link: '#',
    descriptionPure: '',
    stack: [
        SkillsBadge.Python,
        SkillsBadge.Django,
        SkillsBadge.DjangoRESTFramework,
        SkillsBadge.Vue,
        SkillsBadge.JavaScript,
        SkillsBadge.PostgreSQL,
        SkillsBadge.Redis,
        SkillsBadge.Apifox,
        SkillsBadge.Grafana,
    ],
};
</script>

<template>
    <Experience :project start="2022.3" team="广州某某科技" title="后端开发">
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
