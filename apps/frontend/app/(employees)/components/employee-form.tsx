import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import {Input} from '@/components/ui/input'

const employeeFormSchema = z.object({
  id: z.number().optional(),
  firstName: z.string().min(2).max(64),
  lastName: z.string().min(2).max(64),
})

interface EmployeeFormProps {
  defaultValues?: z.infer<typeof employeeFormSchema>
}

export function EmployeeForm({defaultValues}: EmployeeFormProps) {
  const form = useForm<z.infer<typeof employeeFormSchema>>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues
  })

  const handleSubmit = form.handleSubmit((values) => {
    console.log('employee form values', values)
    if (values.id) {
      // TODO: update db entry
    } else {
      // TODO: create db entry
    }
  })
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="firstName"
          render={({field}) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}/>
      </form>
    </Form>
  )
}
