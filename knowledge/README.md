# Course knowledge folder

Place the course syllabus and lesson-plan text in this folder as `.md` or `.txt` files. The server reads every supported file when it starts, splits the text into passages, and retrieves the passages most relevant to each student question.

After changing a source file, restart the server. Remove the two `example-*.md` files when the real course content is ready.

For this starter, paste text extracted from PDFs or Word documents into Markdown. This keeps the retrieval logic transparent for students and avoids committing copyrighted or private originals by accident.

## Regenerating this course collection

The repository includes `scripts/extract_course_materials.py` for the instructor source bundle. It converts top-level PDFs and Word files into page-labeled Markdown and groups unique Swift files by topic.

```powershell
python -m pip install -r scripts/requirements.txt
python scripts/extract_course_materials.py "C:\path\to\source-materials" knowledge
```

Review the generated Markdown before committing it. Keep original documents outside the repository.
