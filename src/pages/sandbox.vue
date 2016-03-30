<template>
    <main class="grow-last">
        <section class="margins padding">
            <div>
                <header>Section one</header>
                <p>This is the first section</p>
            </div>
            <aside>
                <header>Sidebar one</header>
            </aside>
        </section>

        <section class="margins padding">
            <aside>
                <header>Sidebar two</header>
            </aside>
            <div>
                <header>Section two</header>
                <p>This is the first section</p>
            </div>
        </section>

        <section class="alternate">
            <div class="margins padding">
                <header>Section three</header>
                <p>This is the third section, and I should fill the remaining height.</p>
            </div>
        </section>
    </main>
</template>
