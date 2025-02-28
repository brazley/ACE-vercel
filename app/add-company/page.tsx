import { AddCompanyForm } from "@/components/forms/add-company-form"
import { Layout } from "@/components/layout"

export default function AddCompanyPage() {
  return (
    <Layout>
      <div className="container mx-auto py-10">
        <AddCompanyForm />
      </div>
    </Layout>
  )
}

