<style lang="sass" scoped>@import 'core';
    main {
        display: flex;
        flex-basis: auto;
        flex-wrap: wrap;
    }

    section {
        padding: 12px;
        width: 100%;

        &:first-of-type {
            padding-bottom: 0;
        }

        &:last-of-type {
            @include alternate-background-bp(tablet);
        }

        @include bp(tablet) {
            width: 50%;
        }
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    li {
        margin-bottom: 24px;
        padding: 0;

        span:first-of-type {
            display: none;
            @include bp(large-phone) { display: inline-block }
        }

        a:hover {
            i.fa-facebook { color: $facebook-color }
            i.fa-twitter { color: $twitter-color }
            i.fa-instagram { color: $instagram-color }
            i.fa-youtube { color: $youtube-color }
        }

        i.fa {
            min-width: 32px;
            font-size: 24px;
            text-align: center;
        }
    }

    textarea {
        min-height: 150px;
    }
</style>

<template>
    <main>
        <section>
            <header>
                <h2>Hit us up on social media</h2>
            </header>
            <ul>
                <li v-for="account in accounts">
                    <a :href="account.href" target="_blank">
                        <i class="fa fa-{{ account.type }}"></i><span>{{ account.domain }}/</span><span>beeasyboards</span>
                    </a>
                </li>
            </ul>
        </section>
        <section>
            <header>
                <h2>Or shoot us an email</h2>
            </header>
            <form @submit.prevent="onFormSubmitted">
                <div class="row">
                    <input
                        v-el:name
                        type="text"
                        class="half field"
                        v-model="form.name"
                        placeholder="Name"
                        required />
                    <input
                        v-el:email
                        type="email"
                        class="half field"
                        v-model="form.email"
                        placeholder="Email address"
                        required />
                </div>
                <textarea
                    class="field"
                    v-el:body
                    v-model="form.body"
                    placeholder="What's on your mind?"
                    required>
                </textarea>
                <button type="submit">Send</button>
            </form>
        </section>
    </main>
</template>

<script>
    module.exports = {

        /**
         * @return {Object}
         */
        data() {
            return {
                accounts: [
                    { type: 'facebook', domain: 'facebook.com', href: 'https://facebook.com/beeasyboards' },
                    { type: 'twitter', domain: 'twitter.com', href: 'https://twitter.com/beeasyboards' },
                    { type: 'instagram', domain: 'instagram.com', href: 'https://instagram.com/beeasyboards' },
                    { type: 'youtube', domain: 'youtube.com', href: 'https://youtube.com/beeasyboards' },
                ],
                form: {
                    name: '',
                    email: '',
                    body: '',
                },
            };
        },

        /**
         * @type {Object}
         */
        methods: {

            /**
             * Submit the message via a post request
             *
             * @return {void}
             */
            onFormSubmitted() {
                console.log ('Submit the message');
            },
        },
    };
</script>
