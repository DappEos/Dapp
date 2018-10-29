import { CreateElement, VNode } from 'vue';
import { Table, TableColumn } from 'element-ui';

export interface TableHeader {
  title: string;
  index?: number;
  property?: string;
}

export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    emptyText: {
      type: String,
      default: 'No data available'
    },
    headers: {
      type: Array,
      required: true
    },
    headerCellClassName: {
      type: Function,
      default: () => 'bg-secondary text-white'
    },
    rowClassName: {
      type: Function,
      default: (data: {rowIndex: number}) => {
        const {rowIndex} = data
        const base = rowIndex % 2 === 0 ? 'bg-primary' : 'bg-secondary'
        return base + ' text-white table-column'
      }
    }
  },
  render(h: CreateElement) {
    const children: VNode[] = []
    const {
      data,
      $slots,
      headers,
      emptyText,
      $scopedSlots,
      rowClassName,
      headerCellClassName,
    } = this as any

    (headers as TableHeader[]).forEach((header: TableHeader, i: number) => {
      const {title, property} = header
      let opts: any = {
        key: i,
        props: {
          label: title,
          prop: property,
          align: 'center'
        },
      }
      const slot: (v: any) => VNode = $scopedSlots[`col-${property}`]
      if (slot) {
        opts = {
          ...opts,
          scopedSlots: {
            default: (props: any) => slot(props)
          }
        }
      }
      const col = h(TableColumn, opts)
      children.push(col)
    })

    let tableOpts: any = {
      props: {
        data,
        headers,
        rowClassName,
        headerCellClassName,
      }
    }

    if ($slots.empty) {
      tableOpts = {
        ...tableOpts,
        slots: {
          empty: $slots.empty
        }
      }
    } else {
      const {props} = tableOpts
      tableOpts = {...tableOpts, props: {...props, emptyText}}
    }
    const table: VNode = h(Table, tableOpts, children)
    return h('div', {class: 'full-width'}, [table])
  }
}
