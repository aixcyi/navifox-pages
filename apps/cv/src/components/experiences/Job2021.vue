<script lang="ts" setup>
import Experience from '#/components/Experience.vue';
import { ColorBadge } from '@navifox/constants';
import type { Project } from '@navifox/types';

const project: Project = {
    name: '跨境电商ERP',
    description: '',
    stack: [
        ColorBadge.Python,
        ColorBadge.Django,
        ColorBadge.Bootstrap,
        ColorBadge.PostgreSQL,
    ]
}
</script>


<template>
<Experience :project start="2021.3" stop="2022.1" team="中山一件科技" title="后端开发">
    <div>
        <p>
            <span>在职期间领导开发部门将偏内部的 ERP 拆分为 WMS、OMS 及管理端，重新设计 ORM 模型、路由交互，</span>
            <span>分出 <code>master</code>、<code>dev</code>、<code>prod</code> 三条分支管理，</span>
            <span>并定期主持<u>代码审查</u>（Code Review）。</span>
        </p>
        <p>
            <span>借助 GitHub 的 Issues、Projects 规划设计、管理项目、追踪问题、进行团队协作；</span>
            <span>使用 Markdown 在 GitHub Wiki 积累公司内部知识库；</span>
            <span>将亚马逊 MWS API 升级为 SP-API；</span>
            <span>对接 Shippo 地址校验、物流渠道查价、订单创建及回调；</span>
            <span>优化"尾程派送单"的 ORM 查询；通过事务保证出入库、上下架、流水记录、费用划扣的原子性。</span>
        </p>
        <!-- TODO: 待完善 -->
    </div>
</Experience>
</template>
