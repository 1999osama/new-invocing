// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

/**
 * ! Icons Imports:
 * ! You need to import all the icons which come from the API or from your server and then add these icons in 'icons' variable.
 * ! If you need all the icons from the library, use "import * as Icon from 'mdi-material-ui'"
 * */
import Poll from 'mdi-material-ui/Poll'
import Cellphone from 'mdi-material-ui/Cellphone'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'

// ** Types
// import { FaqType, FaqQAndAType } from 'src/@fake-db/types'

// interface Props {
//   data: FaqType[]
// }

const icons = {
  Poll,
  Cellphone,
  CurrencyUsd
}

const FaqAccordions = ({ data }: any) => {
  // ** States
  const [expandedCommon, setExpandedCommon] = useState<string | false>(false)
  const [expandedPayment, setExpandedPayment] = useState<string | false>(false)
  const [expandedProduct, setExpandedProduct] = useState<string | false>(false)

  const expanded = (section: string, panel: string) => {
    if (section === 'common') {
      return expandedCommon === panel
    } else if (section === 'payment') {
      return expandedPayment === panel
    } else {
      return expandedProduct === panel
    }
  }

  const handleChange = (section: string, panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    if (section === 'common') {
      setExpandedCommon(isExpanded ? panel : false)
    } else if (section === 'payment') {
      setExpandedPayment(isExpanded ? panel : false)
    } else {
      setExpandedProduct(isExpanded ? panel : false)
    }
  }

  const renderAccordions = (item: any) => {
    return item.qAndA.map((obj: any) => {
      return (
        <Accordion key={obj.id} expanded={expanded(item.id, obj.id)} onChange={handleChange(item.id, obj.id)}>
          <AccordionSummary
            expandIcon={<ChevronDown />}
            id={`faq-accordion-${item.id}-${obj.id}-header`}
            aria-controls={`faq-accordion-${item.id}-${obj.id}-content`}
          >
            <Typography>{obj.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{obj.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      )
    })
  }

  const renderData = () => {
    if (data) {
      return (
        <>
          {data.map((item: any) => {
            if (item) {
              const IconTag = icons[item.icon as keyof typeof icons]

              return (
                <Box key={item.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      variant='rounded'
                      sx={{ backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)` }}
                    >
                      <IconTag sx={{ fontSize: '1.375rem' }} />
                    </Avatar>
                    <Box sx={{ ml: 4 }}>
                      <Typography variant='h6' sx={{ lineHeight: '2rem' }}>
                        {item.title}
                      </Typography>
                      <Typography variant='body2'>{item.subtitle}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 5 }}>{renderAccordions(item)}</Box>
                </Box>
              )
            } else {
              return null
            }
          })}
        </>
      )
    } else {
      return null
    }
  }

  return renderData()
}

export default FaqAccordions
