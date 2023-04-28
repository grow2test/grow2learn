<template>
    <div class="container">
        <h1 class="title">My Repositories</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Language</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="repo in repositories" :key="repo.id">
                    <td>{{ repo.name }}</td>
                    <td>{{ repo.description }}</td>
                    <td>{{ repo.language }}</td>
                </tr>
            </tbody>
        </table>

        <h1 class="title">Recent Commits</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Repository</th>
                    <th>Message</th>
                    <th>Author</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="commit in commits" :key="commit.sha">
                    <td>{{ commit.repository }}</td>
                    <td>{{ commit.commit.message }}</td>
                    <td>{{ commit.commit.author.name }}</td>
                    <td>{{ commit.commit.author.date }}</td>
                </tr>
            </tbody>
        </table>

        <h1 class="title">Branches</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Last Commit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="branch in branches" :key="branch.name">
                    <td>{{ branch.name }}</td>
                    <td>{{ branch.commit.sha }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "GithubCallback",
    data() {
        return {
            repositories: [],
            commits: [],
            branches: [],
        };
    },
    async mounted() {
        // Fetch repositories
        const repoResponse = await axios.get('https://api.github.com/user/repos', {
            headers: {
                Authorization: `token ${process.env.VUE_APP_ACCESS_TOKEN}`,
            },
        });
        this.repositories = repoResponse.data;

        // Fetch recent commits
        const commitResponse = await axios.get('https://api.github.com/user/repos?sort=updated', {
            headers: {
                Authorization: `token ${process.env.VUE_APP_ACCESS_TOKEN}`,
            },
        });
        const recentRepos = commitResponse.data.slice(0, 5);
        const commitPromises = recentRepos.map(repo =>
            axios.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`, {
                headers: {
                    Authorization: `token ${process.env.VUE_APP_ACCESS_TOKEN}`,
                },
            })
        );
        const commitResponses = await Promise.all(commitPromises);
        this.commits = commitResponses.flatMap(response => response.data.map(commit => ({
            repository: response.config.url.match(/repos\/([^/]+)\/([^/]+)/)[2], commit
        })));

        // Fetch branches
        const branchResponse = await axios.get(`https://api.github.com/repos/${this.repositories[0].owner.login}/${this.repositories[0].name}/branches`, {
            headers: {
                Authorization: `token ${process.env.VUE_APP_ACCESS_TOKEN}`,
            },
        });
        this.branches = branchResponse.data;
    },
};
</script>

<style>
.container {
    max-width: 800px;
    margin: 0 auto;
}

.title {
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
}

.table th {
    text-align: left;
    padding: 0.5rem;
    background-color: #f5f5f5;
    border-bottom: 2px solid #ccc;
}

.table td {
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;
}

.table td:first-child {
    width: 30%;
}

.table td:last-child {
    width: 20%;
}
</style>