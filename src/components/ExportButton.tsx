import { Button } from '@chakra-ui/react'
import { useNotes } from '../hooks/useNotes'

export const ExportButton = () => {
  const { data, error, loading } = useNotes()

  const handleExport = () => {
    if (!data) return
    const parsedData = data.map(note => ({
      text: note.text,
      createdAt: note.createdAt,
    }))
    console.log(parsedData)
    const json = JSON.stringify(parsedData)
    const blob = new Blob([json], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = href
    link.download = 'export.json'
    document.body.appendChild(link)
    link.click()

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }
  return (
    <Button variant='ghost' onClick={handleExport} isLoading={loading}>
      Export
    </Button>
  )
}
