import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa'
import Section from '../layout/Section'
import Grid from '../layout/Grid'
import SectionTitle from '../ui/SectionTitle'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { profile } from '../../data/profile'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' },
}

// Repos to always feature regardless of size/score.
const FEATURED = new Set(['calorie-calculator', 'portfolio'])

// Pull a wider window so the ranking has real signal to work with.
const API = `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=30&type=owner`

// Quality score: prefer repos that are documented, deployed, categorized,
// have real code, and show recent activity. Star count is a tiebreaker.
function scoreRepo(repo) {
  const updatedAt = new Date(repo.pushed_at || repo.updated_at).getTime()
  const ageDays = (Date.now() - updatedAt) / (1000 * 60 * 60 * 24)
  const recency = Math.max(0, 365 - ageDays) // full credit if updated in the last year
  const documented = repo.description ? 50 : 0
  const deployed = repo.homepage ? 40 : 0
  const categorized = Math.min(20, (repo.topics?.length || 0) * 5)
  const hasCode = repo.size > 0 ? 15 : 0
  const stars = Math.min(50, repo.stargazers_count * 5)
  return documented + deployed + categorized + hasCode + stars + recency / 30
}

function formatUpdated(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function ProjectPlaceholder() {
  return (
    <div
      className="aspect-[16/9] w-full rounded-lg border border-line mb-4"
      style={{
        background:
          'linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(168,85,247,0.08) 50%, rgba(5,8,22,0) 100%)',
      }}
    />
  )
}

function ProjectSkeleton() {
  return (
    <Card>
      <div className="aspect-[16/9] w-full rounded-lg bg-line/40 mb-4 animate-pulse" />
      <div className="h-5 w-2/3 rounded bg-line/40 animate-pulse" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full rounded bg-line/40 animate-pulse" />
        <div className="h-3 w-5/6 rounded bg-line/40 animate-pulse" />
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-5 w-12 rounded-full bg-line/40 animate-pulse" />
        <div className="h-5 w-16 rounded-full bg-line/40 animate-pulse" />
      </div>
    </Card>
  )
}

export default function Projects() {
  const [repos, setRepos] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(API)
      .then((r) => {
        if (!r.ok) throw new Error('GitHub fetch failed')
        return r.json()
      })
      .then((data) => {
        if (cancelled) return
        // Drop forks, archived, mirrors, and empty placeholder repos
        // (unless the repo is explicitly featured).
        const eligible = data.filter(
          (r) =>
            !r.fork &&
            !r.archived &&
            !r.disabled &&
            (FEATURED.has(r.name) || r.size > 0)
        )
        const ranked = eligible
          .map((r) => ({ repo: r, score: scoreRepo(r) + (FEATURED.has(r.name) ? 200 : 0) }))
          .sort((a, b) => b.score - a.score)
          .map((x) => x.repo)
        setRepos(ranked.slice(0, 6))
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Section id="projects">
      <motion.div {...fadeUp}>
        <SectionTitle
          eyebrow="Projects"
          title="Selected work from GitHub."
          description="My best public repositories — ranked by documentation, completeness, and recent activity."
        />
      </motion.div>

      <div className="mt-12">
        {repos === null && !error && (
          <Grid cols={3}>
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </Grid>
        )}

        {error && (
          <div className="rounded-xl border border-line bg-bg/40 p-6 text-muted text-sm">
            Couldn't load projects right now.{' '}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary hover:underline"
            >
              View them on GitHub →
            </a>
          </div>
        )}

        {repos && repos.length === 0 && (
          <div className="rounded-xl border border-line bg-bg/40 p-6 text-muted text-sm">
            No public repositories yet.{' '}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary hover:underline"
            >
              Visit my GitHub →
            </a>
          </div>
        )}

        {repos && repos.length > 0 && (
          <Grid cols={3}>
            {repos.map((repo) => (
              <Card key={repo.id} interactive className="flex flex-col">
                <ProjectPlaceholder />
                <h3 className="text-lg font-semibold text-white">
                  {repo.name}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3 min-h-[3.5rem]">
                  {repo.description || 'No description provided.'}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
                  {repo.language && (
                    <span className="px-2 py-0.5 rounded-full border border-line">
                      {repo.language}
                    </span>
                  )}
                  {repo.topics?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full border border-line"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-1">
                    <FaStar size={10} /> {repo.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FaCodeBranch size={10} /> {repo.forks_count}
                  </span>
                  <span className="ml-auto">
                    Updated {formatUpdated(repo.pushed_at || repo.updated_at)}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    href={repo.html_url}
                    external
                    size="md"
                    variant="outline"
                    ariaLabel={`${repo.name} on GitHub`}
                  >
                    <FaGithub size={14} /> GitHub
                  </Button>
                  {repo.homepage && (
                    <Button
                      href={repo.homepage}
                      external
                      size="md"
                      variant="primary"
                      ariaLabel={`${repo.name} live demo`}
                    >
                      <FaExternalLinkAlt size={12} /> Live
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </Grid>
        )}
      </div>
    </Section>
  )
}
