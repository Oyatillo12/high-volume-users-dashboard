import { useEffect, useState } from "react";
import type { User } from "../../model/types";
import { Button, Checkbox, Input, Modal } from "@/shared/ui";

import styles from "./UserModal.module.css";

type Props = {
  user: User;
  onClose: VoidFunction;
  onSave: (u: User) => Promise<void>;
};

type FormState = {
  name: string;
  email: string;
  age: number;
  country: string;
  isActive: boolean;
};

export function UserModal({ user, onClose, onSave }: Props) {
  const [form, setForm] = useState<FormState>(() => ({
    name: user.name,
    email: user.email,
    age: user.age,
    country: user.country,
    isActive: user.isActive,
  }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm({
      name: user.name,
      email: user.email,
      age: user.age,
      country: user.country,
      isActive: user.isActive,
    });
    setError(null);
  }, [user]);

  const updateForm = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await onSave({ ...user, ...form });
      onClose();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen onClose={onClose} title="User details">
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Name"
          disabled={saving}
          value={form.name}
          onChange={(e) => updateForm("name", e.target.value)}
        />

        <Input
          label="Email"
          disabled={saving}
          value={form.email}
          onChange={(e) => updateForm("email", e.target.value)}
        />

        <Input
          label="Age"
          disabled={saving}
          type="number"
          value={form.age}
          onChange={(e) => updateForm("age", Number(e.target.value))}
        />

        <Input
          label="Country"
          disabled={saving}
          value={form.country}
          onChange={(e) => updateForm("country", e.target.value)}
        />

        <Checkbox
          disabled={saving}
          checked={form.isActive}
          onChange={(e) => updateForm("isActive", e.target.checked)}
        >
          Active
        </Checkbox>

        {error && (
          <div style={{ color: "var(--danger)" }}>Save error: {error}</div>
        )}

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </Button>

          <Button type="submit" loading={saving} disabled={saving}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
