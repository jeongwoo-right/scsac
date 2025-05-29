// 📁 src/components/CreateCategoryModal.tsx
import type { ChangeEvent } from "react"
import "../components/SidebarLayout.css"
import type { Dispatch, SetStateAction } from "react"

interface CreateCategoryModalProps {
  newCategory: string
  setNewCategory: (value: string) => void
  selectedAuthority: string[]
  setSelectedAuthority: Dispatch<SetStateAction<string[]>> // ✅ 요거!
  onClose: () => void
  onSubmit: () => void
}

const CreateCategoryModal = ({
  newCategory,
  setNewCategory,
  selectedAuthority,
  setSelectedAuthority,
  onClose,
  onSubmit,
}: CreateCategoryModalProps) => {

  const handleAuthorityToggle = (authority: string) => {
    setSelectedAuthority(prev =>
      prev.includes(authority)
        ? prev.filter(a => a !== authority)
        : [...prev, authority]
    );
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>게시판 생성</h3>
        <input
          type="text"
          value={newCategory}
          placeholder="게시판 이름"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value)}
        />

        <div className="access-roles">
          <label>접근 권한:</label>
          <div className="checkbox-row">
            <label>
              <input
                type="checkbox"
                value="ROLE_Student"
                checked={selectedAuthority.includes("ROLE_Student")}
                onChange={() => handleAuthorityToggle("ROLE_Student")}
              />
              재학생
            </label>
            <label>
              <input
                type="checkbox"
                value="ROLE_Graduate"
                checked={selectedAuthority.includes("ROLE_Graduate")}
                onChange={() => handleAuthorityToggle("ROLE_Graduate")}
              />
              졸업생
            </label>
          </div>
        </div>

        <div className="modal-buttons">
          <button onClick={onSubmit}>생성</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
