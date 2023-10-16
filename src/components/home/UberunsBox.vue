
<template>
            <BaseBox class="center uberuns_box">
            <span class="title blue bold">Vom Traum zur Realität: Unsere eigene Praxis - Eine Reise von 10 Jahren Zusammenarbeit</span>
            <br>
            <span class="left paragraph">
                Im Mai 2023 haben wir unsere eigene Praxis gegründet, nachdem wir fast 10 Jahre Seite an Seite gearbeitet haben. Unsere langjährige berufliche Partnerschaft, unser gemeinsames Verständnis für Behandlungen und das gegenseitige Vertrauen waren starke Anreize für uns, das Projekt der eigenen Praxis zu verwirklichen.
            </span>
            <br>
            <RouterLink  to="/uberuns">
            <BaseButtonMag>mehr</BaseButtonMag>
        </RouterLink>
            </BaseBox>
</template>

<style>
.uberuns_box{
 display: flex;
 flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    aspect-ratio: 1.3/1;
}
@media (max-width: 990px){
    .uberuns_box{
        aspect-ratio: auto !important;
    }
}</style>