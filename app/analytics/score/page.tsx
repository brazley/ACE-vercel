"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ResponsiveRadar } from "@nivo/radar"
import { motion } from "framer-motion"

// This is a placeholder for actual data. In a real application, this would come from an API or database.
const scoreData = {
  overallScore: 85,
  categories: [
    { name: "Financial Health", score: 90, description: "Measures the company's financial stability and growth" },
    { name: "Project Performance", score: 80, description: "Evaluates the success rate and efficiency of projects" },
    { name: "Client Satisfaction", score: 88, description: "Based on client feedback and repeat business" },
    { name: "Safety Record", score: 95, description: "Assesses workplace safety practices and incident rates" },
    { name: "Sustainability", score: 72, description: "Measures environmental impact and sustainable practices" },
  ],
}

const AnimatedCircularProgress = ({ value }: { value: number }) => {
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500" // Good
    if (score >= 60) return "text-orange-500" // Okay
    return "text-red-500" // Bad
  }

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-700 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        <motion.circle
          className={`${getScoreColor(value)} stroke-current`}
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: value / 100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
        ></motion.circle>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-4xl font-bold ${getScoreColor(value)}`}>{value}</span>
      </div>
    </div>
  )
}

export default function ScorePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-100">The Score</h1>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <Skeleton className="h-4 w-[250px] bg-gray-700" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <Skeleton className="h-48 w-48 rounded-full bg-gray-700" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <Skeleton className="h-4 w-[200px] bg-gray-700" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full bg-gray-700" />
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <Skeleton className="h-4 w-[150px] bg-gray-700" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2 bg-gray-700" />
                  <Skeleton className="h-2 w-full bg-gray-700" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-100">The Score</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Overall Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <AnimatedCircularProgress value={scoreData.overallScore} />
              </div>
              <div className="mt-4 text-center">
                <Badge
                  variant="secondary"
                  className={`text-lg bg-gray-700 ${
                    scoreData.overallScore >= 80
                      ? "text-green-500"
                      : scoreData.overallScore >= 60
                        ? "text-orange-500"
                        : "text-red-500"
                  }`}
                >
                  {scoreData.overallScore >= 80
                    ? "Excellent"
                    : scoreData.overallScore >= 60
                      ? "Good"
                      : "Needs Improvement"}
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Category Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveRadar
                  data={scoreData.categories}
                  keys={["score"]}
                  indexBy="name"
                  maxValue={100}
                  margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                  borderColor={{ from: "color" }}
                  gridLabelOffset={36}
                  dotSize={10}
                  dotColor={{ theme: "background" }}
                  dotBorderWidth={2}
                  colors={["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]}
                  blendMode="normal"
                  motionConfig="wobbly"
                  legends={[
                    {
                      anchor: "top-left",
                      direction: "column",
                      translateX: -50,
                      translateY: -40,
                      itemWidth: 80,
                      itemHeight: 20,
                      itemTextColor: "#FFFFFF",
                      symbolSize: 12,
                      symbolShape: "circle",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemTextColor: "#3B82F6",
                            itemBackground: "rgba(59, 130, 246, 0.1)",
                          },
                        },
                      ],
                    },
                  ]}
                  theme={{
                    textColor: "#FFFFFF",
                    fontSize: 12,
                    tooltip: {
                      container: {
                        background: "#1F2937",
                        color: "#FFFFFF",
                        fontSize: 14,
                        borderRadius: 4,
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                        border: "1px solid #374151",
                      },
                    },
                    axis: {
                      domain: {
                        line: {
                          stroke: "#6B7280",
                          strokeWidth: 1,
                        },
                      },
                      ticks: {
                        line: {
                          stroke: "#6B7280",
                          strokeWidth: 1,
                        },
                        text: {
                          fill: "#FFFFFF",
                          fontWeight: 500,
                        },
                      },
                    },
                    grid: {
                      line: {
                        stroke: "#6B7280",
                        strokeWidth: 1,
                      },
                    },
                    dots: {
                      text: {
                        fill: "#FFFFFF",
                      },
                      hover: {
                        color: "#3B82F6",
                      },
                    },
                    labels: {
                      text: {
                        fill: "#FFFFFF",
                        fontWeight: 600,
                        fontSize: 14,
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <h2 className="text-2xl font-semibold my-6 text-gray-100">Category Breakdown</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {scoreData.categories.map((category) => (
            <Card key={category.name} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-100">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-2xl font-semibold ${
                      category.score >= 80
                        ? "text-green-500"
                        : category.score >= 60
                          ? "text-orange-500"
                          : "text-red-500"
                    }`}
                  >
                    {category.score}
                  </span>
                  <Badge
                    variant="outline"
                    className={`bg-gray-700 border-gray-600 ${
                      category.score >= 80
                        ? "text-green-500"
                        : category.score >= 60
                          ? "text-orange-500"
                          : "text-red-500"
                    }`}
                  >
                    {category.score >= 80 ? "Strong" : category.score >= 60 ? "Average" : "Weak"}
                  </Badge>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                          <motion.div
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                              category.score >= 80
                                ? "bg-green-500"
                                : category.score >= 60
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${category.score}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-700 text-gray-100 border-gray-600">
                      <p>{category.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

