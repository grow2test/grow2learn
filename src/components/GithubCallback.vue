<template>
    <div class="container">
        <h1>Github Repositories</h1>
        <div v-if="loading">
            <p>Loading...</p>
        </div>
        <div v-else>
            <ul class="list-repo">
                <li v-for="repo in repositories" :key="repo.id">
                    <a href="#" @click.prevent="getBranches(repo)">{{ repo.name }}</a>
                </li>
            </ul>
        </div>

        <div v-if="currentRepo">
            <h2>{{ currentRepo.name }} Branches</h2>
            <table>
                <thead>
                    <tr>
                        <th >Name</th>
                        <th>Commit History</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="branch in branches" :key="branch.name">
                        <td class="branch-name">{{ branch.name }}</td>
                        <td><button @click="getCommits(branch)">View Commits</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="currentBranch">
            <h2>Commits for {{ currentBranch.name }}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="commit in commits" :key="commit.sha">
                        <td>{{ commit.commit.author.name }}</td>
                        <td>{{ commit.commit.message }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="errorMsg">There is some error, please try again.</div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            repositories: [],
            loading: false,
            currentRepo: null,
            branches: [],
            currentBranch: null,
            commits: [],
            errorMsg: false,
        };
    },
    methods: {
        async getAccessToken() {
         try {
            const response = await axios.get('http://localhost:3000/getAuthCode', {
                params: {
                    code: this.$route.query.code,
                }
            });
             const accessToken = response.data.access_token;
             if (accessToken) {
                localStorage.setItem('access_token', accessToken);
            }
            this.getRepositories();

            } catch (error) {
                this.errorMsg = true
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        async getRepositories() {
            try {
                this.loading = true;
                const accessToken = localStorage.getItem('access_token')

                const response = await axios.get('https://api.github.com/user/repos', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                this.repositories = response.data;
            } catch (error) {
                this.errorMsg = true
            } finally {
                this.loading = false;
            }
        },
        async getBranches(repo) {
            try {
                const accessToken = localStorage.getItem('access_token')

                const response = await axios.get(`https://api.github.com/repos/${repo.full_name}/branches`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                this.currentRepo = repo;
                this.branches = response.data;
                this.currentBranch = null;
                this.commits = [];
            } catch (error) {
                this.errorMsg = true
                console.error(error);
            }
        },
        async getCommits(branch) {
            try {
                const accessToken = localStorage.getItem('access_token')

                const response = await axios.get(`https://api.github.com/repos/${this.currentRepo.full_name}/commits?sha=${branch.name}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                this.currentBranch = branch;
                this.commits = response.data;
            } catch (error) {
                this.errorMsg = true
                console.error(error);
            }
        }
    },
    mounted() {
        const token = localStorage.getItem("access_token")
        if (token === null || token === "undefined") {
            this.getAccessToken()
        } else {
            this.getRepositories();
        }
    }  
};
</script>

<style>
body {
  font-family: Tahoma, sans-serif;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

table {
  cursor: pointer;
}

th,
td {
  padding: 5px;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: #333;
}

a:hover {
  text-decoration: underline;
}

.loading {
  font-style: italic;
}
.branch-name {
    font-weight: bold;
}
.list-repo {
    list-style-type: disc;
}
</style>