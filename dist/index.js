import * as core from '@actions/core';
import * as github from '@actions/github';
async function run() {
    const actionContext = github.context;
    const ghToken = core.getInput('github-token');
    const octokit = github.getOctokit(ghToken);
    const release = await octokit.rest.repos.getReleaseByTag({
        owner: actionContext.repo.owner,
        repo: actionContext.repo.repo,
        tag: actionContext.ref,
    });
    await octokit.rest.repos.updateRelease({
        owner: actionContext.repo.owner,
        repo: actionContext.repo.repo,
        release_id: release.data.id,
        make_latest: "true",
    });
}
run();
