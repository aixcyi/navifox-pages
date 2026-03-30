<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { ColorBadge } from '@navifox/constants';

const stacks = [
    {
        scope: '编程语言',
        levels: [ '语言', '框架', '生态', '底层' ],
        skills: [
            { badge: ColorBadge.Python, level: 3 },
            { badge: ColorBadge.Kotlin, level: 1 },
            { badge: ColorBadge.Golang, level: 0 },
            { badge: ColorBadge.Java, level: 0 },
            { badge: ColorBadge.Rust, level: -1 },
            { badge: ColorBadge.JavaScript, level: 1 },
            { badge: ColorBadge.TypeScript, level: 1 },
        ]
    }, {
        scope: '后端开发',
        levels: [ '会用', '熟悉', '调优', '定制' ],
        skills: [
            { badge: ColorBadge.Django, level: 3 },
            { badge: ColorBadge.DjangoRESTFramework, level: 3 },
            { badge: ColorBadge.FastAPI, level: -1 },
            { badge: ColorBadge.Flask, level: -1 },
            { badge: ColorBadge.NumPy, level: 0 },
            { badge: ColorBadge.Pandas, level: 0 },
            { badge: ColorBadge.Selenium, level: 0 },
            { badge: ColorBadge.Celery, level: 1 },
            { badge: ColorBadge.Spring, level: -1 },
        ]
    }, {
        scope: '前端开发',
        levels: [ '会用', '熟悉', '调优', '定制' ],
        skills: [
            { badge: ColorBadge.TailwindCSS, level: 2 },
            { badge: ColorBadge.Vue, level: 2 },
            { badge: ColorBadge.Bootstrap, level: 1 },
            { badge: ColorBadge.Pinia, level: 0 },
            { badge: ColorBadge.Gsap, level: 1 },
            { badge: ColorBadge.VitePress, level: 2 },
            { badge: ColorBadge.Naive, level: -1 },
            { badge: ColorBadge.Vite, level: 1 },
            { badge: ColorBadge.Npm, level: 1 },
            { badge: ColorBadge.Pnpm, level: 1 },
            { badge: ColorBadge.WebHTML, level: 1 },
            { badge: ColorBadge.WebCSS, level: 1 },
        ]
    }, {
        scope: 'DevOps',
        levels: [ '了解', '用过', '熟练', '精通' ],
        skills: [
            { badge: ColorBadge.Bash, level: 1 },
            { badge: ColorBadge.Cmd, level: 2 },
            { badge: ColorBadge.Powershell, level: 0 },
            { badge: ColorBadge.NuShell, level: -1 },
            { badge: ColorBadge.Git, level: 2 },
            { badge: ColorBadge.GitHubAction, level: 1 },
            { badge: ColorBadge.Apifox, level: 2 },
            { badge: ColorBadge.Grafana, level: 1 },
        ]
    }, {
        scope: '存储类',
        levels: [ '学过', '用过', '调过', '救过' ],
        skills: [
            { badge: ColorBadge.PostgreSQL, level: 2 },
            { badge: ColorBadge.MySQL, level: 1 },
            { badge: ColorBadge.Redis, level: 1 },
            { badge: ColorBadge.SQLite, level: 0 },
        ]
    }, {
        scope: '环境类',
        levels: [ '落灰', '会用', '熟练', '发烧' ],
        skills: [
            { badge: ColorBadge.PyCharm, level: 3 },
            { badge: ColorBadge.IntelliJ, level: 1 },
            { badge: ColorBadge.WebStorm, level: 2 },
            { badge: ColorBadge.DataGrip, level: 1 },
            { badge: ColorBadge.Goland, level: 0 },
            { badge: ColorBadge.VisualStudioCode, level: 1 },
            { badge: ColorBadge.VisualStudio, level: 0 },
            { badge: ColorBadge.Ubuntu, level: 1 },
            { badge: ColorBadge.Kali, level: 0 },
            { badge: ColorBadge.Firefox, level: 2 },
            { badge: ColorBadge.Chrome, level: 1 },
        ]
    }, {
        scope: '未分类',
        levels: [ '会用', '常用', '复用', '调优' ],
        skills: [
            { badge: ColorBadge.Markdown, level: 3 },
        ]
    },
]

for (const tree of stacks) {
    tree.skills.sort((a, b) => a.badge.text!.localeCompare(b.badge.text!))
}
</script>


<template>
<div class="flex flex-col gap-7">
    <section v-for="branch in stacks" class="flex flex-col gap-3">
        <div><b>{{ branch.scope }}</b></div>
        <div v-if="branch.skills" class="text-sm flex flex-wrap gap-x-6 gap-y-2">
            <div v-for="skill in branch.skills"
                 class="Badge flex flex-nowrap gap-2 items-center">
                <Icon :icon="skill.badge.logo" width="24" />
                <div class="flex flex-nowrap gap-1 relative">
                    <span v-for="(label, level) in branch.levels"
                          :class="level <= skill.level ? '' : 'text-slate-700'"
                          class="BadgeLevel cursor-default">{{ label }}</span>
                    <span class="BadgeText">{{ skill.badge.text }}&nbsp;</span>
                </div>
            </div>
        </div>
    </section>
</div>
</template>


<style scoped>
.Badge:hover {
    .BadgeLevel {
        opacity: 0;
    }

    .BadgeText {
        opacity: 100%;
    }
}

.BadgeText {
    position: absolute;
    left: 0;
    top: 0;
    text-wrap: nowrap;
    background-color: var(--color-slate-800);
    color: var(--color-slate-400);
    opacity: 0;
}
</style>
