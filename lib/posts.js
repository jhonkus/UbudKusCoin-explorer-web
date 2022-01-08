import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    return " getSortedPostsData result";
}

export function getAllPostIds() {
    return " getAllPostIds result";
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    return " getPostData result";
}
