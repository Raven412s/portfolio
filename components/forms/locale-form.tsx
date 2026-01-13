// components/forms/locale-form.tsx
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { PlusCircle, MinusCircle, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const localeSchema = z.object({
  language: z.string().min(2),
  code: z.string().min(2).max(2),
  direction: z.enum(["ltr", "rtl"]),
})

const formSchema = z.object({
  locales: z.array(localeSchema).min(1),
})

type FormValues = z.infer<typeof formSchema>

interface LocaleFormProps {
  mode?: "add" | "edit"
  initialData?: {
    id: string
    language: string
    code: string
    direction: "ltr" | "rtl"
  }
  onSuccess?: () => void
}

export default function LocaleForm({
  mode = "add",
  initialData,
  onSuccess,
}: LocaleFormProps) {
  const [loading, setLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      locales: [
        initialData ?? { language: "", code: "", direction: "ltr" },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "locales",
  })

  useEffect(() => {
    if (mode === "edit" && initialData) {
      form.reset({
        locales: [initialData],
      })
    }
  }, [mode, initialData, form])

  async function onSubmit(data: FormValues) {
    try {
      setLoading(true)

      const isEdit = mode === "edit" && initialData

      const res = await fetch(
        isEdit
          ? `/api/admin/locales/${initialData!.id}`
          : "/api/admin/locales",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isEdit ? data.locales[0] : data
          ),
        }
      )

      const result: { success: boolean; message?: string } =
        await res.json()

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Action failed")
      }

      toast.success(
        isEdit ? "Locale updated" : "Locales added successfully"
      )

      if (mode === "add") {
        form.reset({
          locales: [{ language: "", code: "", direction: "ltr" }],
        })
      }

      onSuccess?.()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl pb-2.5">
      <CardHeader>
        <CardTitle>
          {mode === "edit" ? "Edit Locale" : "Add Locales"}
        </CardTitle>
        <CardDescription>
          {mode === "edit"
            ? "Update language configuration"
            : "Add all supported languages for your website"}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-2">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {fields.map((field, index) => (
            <FieldGroup key={field.id} className="relative border p-4 rounded-lg">
              {/* Language */}
              <Controller
                control={form.control}
                name={`locales.${index}.language`}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Language</FieldLabel>
                    <Input {...field} />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Code */}
              <Controller
                control={form.control}
                name={`locales.${index}.code`}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Code</FieldLabel>
                    <Input
                      {...field}
                      disabled={mode === "edit"}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Direction */}
              <Controller
                control={form.control}
                name={`locales.${index}.direction`}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Direction</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ltr">LTR</SelectItem>
                        <SelectItem value="rtl">RTL</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              {/* Remove (only in add mode) */}
              {mode === "add" && fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => remove(index)}
                >
                  <MinusCircle className="size-4 text-destructive" />
                </Button>
              )}
            </FieldGroup>
          ))}

          <CardFooter className="px-0 py-0 flex justify-between items-center">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
              {mode === "edit" ? "Update Locale" : "Save Locales"}
            </Button>

            {mode === "add" && (
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({ language: "", code: "", direction: "ltr" })
                }
                className="flex gap-2"
                disabled={loading}
              >
                <PlusCircle className="size-4" />
                Add Locale
              </Button>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
