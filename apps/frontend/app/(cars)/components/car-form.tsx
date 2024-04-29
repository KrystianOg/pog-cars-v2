'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import {Input} from '@/components/ui/input'

const carFormSchema = z.object({
  id: z.number().optional(), // defines if entry already exists
  mileage: z.number().min(0),
  horsepower: z.number().min(0),
  seats: z.number().min(0),
  drivetrain: z.enum(['FWD', 'RWD', '4WD', 'AWD']),
  price: z.number().min(0),
  year: z.number().min(0),
  mode: z.string().max(64),
  make: z.string().max(64),
})

interface CarFormProps {
  defaultValues?: z.infer<typeof carFormSchema>
}

export function CarForm({defaultValues}: CarFormProps) {
  const form = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
    defaultValues 
  })
  
  const handleSubmit = form.handleSubmit((values) => {
    console.log('car form values', values)

    if (values.id) {
      // TODO update db entry
    } else {
      // TODO create db entry
    }
  })
  return (
  <Form {...form}>
      <form onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="year"
          render={({field}) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input type="number" placeholder={new Date().getFullYear().toString()} {...field}/>
              </FormControl>
            </FormItem>
          )}/>
      </form>
    </Form>
  )
}
