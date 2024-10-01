import { createFileRoute, useNavigate } from "@tanstack/react-router"
import * as React from "react"
import { motion } from "framer-motion"
import { Autocomplete } from "~/components/landing/Autocomplete"
import { ForceGraphClient } from "~/components/landing/ForceGraphClient"
import { cn } from "@/lib/utils"
import Graph from "@/data/graph.json"

export const Route = createFileRoute("/_landing/")({
  component: LandingComponent,
})

const GraphData = Graph as GraphNode[]

export interface GraphNode {
  name: string
  prettyName: string
  connectedTopics: string[]
}

function LandingComponent() {
  const navigate = useNavigate()
  const [filterQuery, setFilterQuery] = React.useState<string>("")

  const handleTopicSelect = (topic: string) => {
    navigate({
      to: topic,
    })
  }

  const handleInputChange = (value: string) => {
    setFilterQuery(value)
  }

  return (
    <div className="relative h-full w-screen">
      <ForceGraphClient
        raw_nodes={GraphData}
        onNodeClick={handleTopicSelect}
        filter_query={filterQuery}
      />

      <div className="absolute left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 transform max-sm:px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className={cn(
              "mb-2 text-center text-5xl font-bold tracking-tight sm:mb-4 md:text-7xl font-raleway",
            )}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I want to learn
          </motion.h1>
          <Autocomplete
            topics={GraphData}
            onSelect={handleTopicSelect}
            onInputChange={handleInputChange}
          />
        </motion.div>
      </div>
    </div>
  )
}
