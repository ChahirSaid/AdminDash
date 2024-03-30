"""empty message

Revision ID: 468492508ff6
Revises: 7f575bb1593f
Create Date: 2024-03-30 11:21:57.706146

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '468492508ff6'
down_revision = '7f575bb1593f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('team_member', schema=None) as batch_op:
        batch_op.alter_column('startDate',
               existing_type=sa.DATE(),
               type_=sa.DateTime(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('team_member', schema=None) as batch_op:
        batch_op.alter_column('startDate',
               existing_type=sa.DateTime(),
               type_=sa.DATE(),
               existing_nullable=True)

    # ### end Alembic commands ###