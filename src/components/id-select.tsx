import { Select } from 'antd'
import React from 'react'
import { Raw } from 'types'

type SelectProps = React.ComponentProps<typeof Select>
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'>{
  value?: Raw | null | undefined,
  onChange?: (value?:number) => void,
  defaultOptionName?: string,
  options?: {name: string, id: number}[]
}
/**
 * 
 * value 可以传入多种类型的值
 * onchange只会回调number|undefined类型
 * 当isNaN(Number(value))为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options } = props
  return <Select
    value={options?.length ? toNumber(value) : 0}
    onChange={value => onChange?.(Number(value) || undefined)}
  >
    {
      defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
    }
    {
      options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
    }
  </Select>
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)