import { AddIndividualForm } from "@/components/forms/add-individual-form"
import { Layout } from "@/components/layout"

export default function AddIndividualPage() {
  return (
    <Layout>
      <div className="container mx-auto py-10">
        <AddIndividualForm />
      </div>
    </Layout>
  )
}

